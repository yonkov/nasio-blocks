<?php
/*
 * Plugin Name: Nasio Blocks
 * Plugin URI: https://github.com/yonkov/nasio-blocks
 * Description: Custom blocks for the WordPress Block editor.
 * Version: 1.0.0
 * Requires at least: 6.7
 * Requires PHP: 7.2
 * Author: Atanas Yonkov
 * Author URI: https://nasiothemes.com
 * License: GPL
 * Text Domain: nasio-blocks
=====================================================================================
Copyright (C) 2025-present Atanas Yonkov
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with WordPress; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
=====================================================================================
*/

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Woof Woof Woof!' );
}

define( 'NASIO_BLOCKS_VERSION', '1.0.0' );
define( 'NASIO_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'NASIO_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register custom block category for Nasio Blocks
 *
 * @param array $categories Array of block categories.
 * @return array Modified block categories.
 */
function nasio_blocks_register_block_category( $categories ) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'nasio-blocks',
                'title' => __( 'Nasio Blocks', 'nasio-blocks' ),
                'icon'  => 'admin-plugins',
            ],
        ]
    );
}

add_filter( 'block_categories_all', 'nasio_blocks_register_block_category' );

/**
 * Enqueue scripts and styles.
 */
function nasio_blocks_scripts_and_styles() {
	wp_enqueue_style( 'nasio-blocks', plugin_dir_url( __FILE__ ) . 'assets/css/main.css', array(), filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/main.css' ) );
	wp_enqueue_script( 'nasio-blocks', plugin_dir_url( __FILE__ ) . 'assets/js/main.js', array(), filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/main.js' ), true );
}
add_action( 'wp_enqueue_scripts', 'nasio_blocks_scripts_and_styles' );

function nasio_blocks_register_shared_assets() {
	// Register Swiper assets for all slider blocks
	wp_register_script(
		'nasio-swiper-js',
		plugins_url( 'assets/lib/swiper.min.js', __FILE__ ),
		array(),
		'11.2.6',
		true
	);

	wp_register_style(
		'nasio-swiper-css',
		plugins_url( 'assets/lib/swiper.min.css', __FILE__ ),
		array(),
		'11.2.6'
	);
}
add_action( 'init', 'nasio_blocks_register_shared_assets', 5 ); // Lower priority to ensure it runs before block registration

/**
 * Enqueue Swiper slider assets for blocks that need them
 */
function nasio_blocks_enqueue_slider_assets() {
    // Check if we're in the editor or if the page contains our blocks
    $has_sliders = has_block('nasio-block/content-slider') || 
                  has_block('nasio-block/post-slider') || 
                  has_block('nasio-block/gallery-slider');
                   
    if (is_admin() || $has_sliders) {
        // Register and enqueue Swiper scripts and styles
        wp_register_script(
            'nasio-swiper-js',
            plugins_url('assets/lib/swiper.min.js', __FILE__),
            array(),
            '11.0.3',
            true
        );
        
        wp_register_style(
            'nasio-swiper-css',
            plugins_url('assets/lib/swiper.min.css', __FILE__),
            array(),
            '11.0.3'
        );
        
        // Enqueue them
        wp_enqueue_script('nasio-swiper-js');
        wp_enqueue_style('nasio-swiper-css');
    }
}
add_action('enqueue_block_editor_assets', 'nasio_blocks_enqueue_slider_assets');
add_action('wp_enqueue_scripts', 'nasio_blocks_enqueue_slider_assets');

function nasio_blocks_is_enabled( $block_key ) {
	$settings = get_option( 'nasio_blocks_enabled_blocks', array() );
	return isset( $settings[ $block_key ] ) ? (bool) $settings[ $block_key ] : true;
}

// Register plugin admin page under settings page
function nasio_blocks_settings_page() {
	$page_title = __( 'Nasio Blocks Options', 'nasio-blocks' );
	$menu_title = __( 'Nasio Blocks', 'nasio-blocks' );
	$capability = 'manage_options';
	$slug       = 'nasio_blocks';
	$callback   = 'nasio_blocks_page_content_callback';
	$icon       = 'dashicons-admin-plugins';
	$position   = 100;

	add_submenu_page( 'options-general.php', $page_title, $menu_title, $capability, $slug, $callback );
}

// Create admin tabs
function nasio_blocks_page_content_callback() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	?>
	<div class="wrap">
		<h2><?php esc_html_e( 'Nasio Blocks Options', 'nasio-blocks' ); ?></h2>

		<?php
		// Get the active tab from the $_GET param
		$default_tab = 'blocks';
		$active_tab  = isset( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ) ) : $default_tab; // // phpcs:ignore csrf ok, sanitization ok. 
		?>

		<h2 class="nav-tab-wrapper">
			<a href="?page=nasio_blocks&tab=blocks"
				class="nav-tab <?php echo $active_tab == 'blocks' ? 'nav-tab-active' : ''; ?>"><?php esc_html_e( 'Blocks', 'nasio-blocks' ); ?></a>
			<a href="?page=nasio_blocks&tab=faq"
				class="nav-tab <?php echo $active_tab == 'faq' ? 'nav-tab-active' : ''; ?>"><?php esc_html_e( 'FAQ', 'nasio-blocks' ); ?></a>
		</h2>

		<?php
		switch ( $active_tab ) :
			case 'blocks':
				if ( isset( $_POST['nasio_blocks_settings_submit'] ) ) {
					check_admin_referer( 'nasio_blocks_save_settings' );
					$settings = array(
						'post_slider'    => isset( $_POST['nasio_blocks_post_slider'] ) ? 1 : 0,
						'content_slider' => isset( $_POST['nasio_blocks_content_slider'] ) ? 1 : 0,
						'icon_block'     => isset( $_POST['nasio_blocks_icon_block'] ) ? 1 : 0,
						'accordion'      => isset( $_POST['nasio_blocks_accordion'] ) ? 1 : 0,
					);
					update_option( 'nasio_blocks_enabled_blocks', $settings );
					echo '<div class="updated"><p>Settings saved.</p></div>';
				}
			
				$saved = get_option( 'nasio_blocks_enabled_blocks', array(
					'post_slider'    => 1,
					'content_slider' => 1,
					'icon_block'     => 1,
					'accordion'      => 1,
				) );
				?>
				<div class="nasio-blocks-admin-content">
					<h3><?php esc_html_e( 'Available Blocks', 'nasio-blocks' ); ?></h3>
					<p><?php esc_html_e( 'Enable or disable individual blocks:', 'nasio-blocks' ); ?></p>
			
					<form method="post">
						<?php wp_nonce_field( 'nasio_blocks_save_settings' ); ?>
						<table class="form-table">
							<tr>
								<th scope="row"><?php esc_html_e( 'Post Slider', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_post_slider" <?php checked( $saved['post_slider'], 1 ); ?> /> Enable</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e( 'Content Slider', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_content_slider" <?php checked( $saved['content_slider'], 1 ); ?> /> Enable</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e( 'Icon Block', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_icon_block" <?php checked( $saved['icon_block'], 1 ); ?> /> Enable</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e( 'Accordion', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_accordion" <?php checked( $saved['accordion'], 1 ); ?> /> Enable</td>
							</tr>
						</table>
						<?php submit_button( 'Save Changes', 'primary', 'nasio_blocks_settings_submit' ); ?>
					</form>
				</div>
				<?php
				break;			
			case 'faq':
				include_once plugin_dir_path( __FILE__ ) . 'templates/faq.php';
				break;
		endswitch;
		?>

	</div> 
	<?php
}

add_action( 'admin_menu', 'nasio_blocks_settings_page' );

/**
 * Add Settings link in WordPress Plugins Page
 */
function nasio_blocks_settings_link( array $links ) {
	$url           = get_admin_url() . 'options-general.php?page=nasio_blocks';
	$settings_link = '<a href="' . esc_url( $url ) . '">' . __( 'Settings', 'nasio-blocks' ) . '</a>';
	$links[]       = $settings_link;
	return $links;
}

add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'nasio_blocks_settings_link' );

/**
 * Include block directories
 */
$block_directories = array(
    'post-slider/post-slider.php',
    'content-slider/content-slider.php',
    'gallery-slider/gallery-slider.php',
    'icon-block/icon-block.php',
    'accordion/accordion.php',
);

foreach ( $block_directories as $block_dir ) {
    $block_path = plugin_dir_path( __FILE__ ) . 'blocks/' . $block_dir;
    if ( file_exists( $block_path ) ) {
        require_once $block_path;
    }
}

/**
 * Custom svg icons
 */
require_once plugin_dir_path( __FILE__ ) . '/assets/svg/svg-icons.php';
