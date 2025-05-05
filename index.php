<?php
/*
 * Plugin Name: Nasio Blocks
 * Plugin URI: https://github.com/yonkov/nasio-blocks
 * Description: Custom blocks for the WordPress Block editor. Easy to use, lightweight and useful.
 * Version: 0.0.1
 * Requires at least: 6.7
 * Requires PHP: 7.2
 * Author: Atanas Yonkov
 * Author URI: https://nasiothemes.com
 * License: GPLv2
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

define( 'NASIO_BLOCKS_VERSION', '0.0.1' );
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
		array(
			array(
				'slug'  => 'nasio-blocks',
				'title' => esc_html__( 'Nasio Blocks', 'nasio-blocks' ),
				'icon'  => 'admin-plugins',
			),
		)
	);
}

add_filter( 'block_categories_all', 'nasio_blocks_register_block_category' );

/**
 * Enqueue Swiper slider assets for the blocks that need them
 */
function nasio_blocks_enqueue_slider_assets() {
	if (nasio_blocks_is_enabled( 'content_slider' ) ||
		nasio_blocks_is_enabled( 'post_slider' ) ||
		nasio_blocks_is_enabled( 'gallery_slider' )
	) {
		wp_enqueue_script(
			'nasio-swiper-js',
			plugins_url( 'assets/lib/swiper.min.js', __FILE__ ),
			array(),
			'11.2.6',
			true
		);

		wp_enqueue_style(
			'nasio-swiper-css',
			plugins_url( 'assets/lib/swiper.min.css', __FILE__ ),
			array(),
			'11.2.6'
		);
	}
}
add_action( 'enqueue_block_assets', 'nasio_blocks_enqueue_slider_assets' );

function nasio_blocks_is_enabled( $block_key ) {
	$settings = get_option( 'nasio_blocks_enabled_blocks', array() );
	return isset( $settings[ $block_key ] ) ? (bool) $settings[ $block_key ] : true;
}

// Register plugin admin page under settings page
function nasio_blocks_settings_page() {
	$page_title = esc_html__( 'Nasio Blocks Options', 'nasio-blocks' );
	$menu_title = esc_html__( 'Nasio Blocks', 'nasio-blocks' );
	$capability = 'manage_options';
	$slug       = 'nasio_blocks';
	$callback   = 'nasio_blocks_page_content_callback';
	$icon       = 'dashicons-admin-plugins';
	$position   = 100;

	add_submenu_page( 'options-general.php', $page_title, $menu_title, $capability, $slug, $callback );
}

/**
 * Register plugin setting and sanitize callback
 */
function nasio_blocks_register_settings() {
    register_setting(
        'nasio_blocks_settings_group',
        'nasio_blocks_enabled_blocks',
        array(
            'sanitize_callback' => 'nasio_blocks_sanitize_settings',
            'default'           => array(
                'post_slider'    => 1,
                'content_slider' => 1,
                'gallery_slider' => 1,
                'icon_block'     => 1,
                'accordion'      => 1,
            ),
        )
    );

    add_settings_section(
        'nasio_blocks_main_section',
        esc_html__( 'Available Blocks', 'nasio-blocks' ),
        function() {
            echo '<p>' . esc_html__( 'Enable or disable individual blocks:', 'nasio-blocks' ) . '</p>';
        },
        'nasio_blocks'
    );

    $fields = array(
        'post_slider'    => esc_html__( 'Post Slider', 'nasio-blocks' ),
        'content_slider' => esc_html__( 'Content Slider', 'nasio-blocks' ),
        'gallery_slider' => esc_html__( 'Gallery Slider', 'nasio-blocks' ),
        'icon_block'     => esc_html__( 'Icon Block', 'nasio-blocks' ),
        'accordion'      => esc_html__( 'Accordion', 'nasio-blocks' ),
    );

    foreach ( $fields as $field_id => $field_label ) {
        add_settings_field(
            'nasio_blocks_' . $field_id,
            $field_label,
            function() use ( $field_id ) {
                $options = get_option( 'nasio_blocks_enabled_blocks', array() );
                $value   = isset( $options[ $field_id ] ) ? (int) $options[ $field_id ] : 0;
                ?>
                <input type="checkbox" name="nasio_blocks_enabled_blocks[<?php echo esc_attr( $field_id ); ?>]" value="1" <?php checked( $value, 1 ); ?> />
                <?php esc_html_e( 'Enable', 'nasio-blocks' ); ?>
                <?php
            },
            'nasio_blocks',
            'nasio_blocks_main_section'
        );
    }
}
add_action( 'admin_init', 'nasio_blocks_register_settings' );

/**
 * Sanitize the checkbox settings
 */
function nasio_blocks_sanitize_settings( $input ) {
    $sanitized = array();
    $valid_keys = array( 'post_slider', 'content_slider', 'gallery_slider', 'icon_block', 'accordion' );

    foreach ( $valid_keys as $key ) {
        $sanitized[ $key ] = isset( $input[ $key ] ) ? (int) (bool) $input[ $key ] : 0;
    }

    return $sanitized;
}


// Create admin tabs
function nasio_blocks_page_content_callback() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$default_tab = 'blocks';
	$active_tab  = isset( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ) ) : $default_tab; // // phpcs:ignore WordPress.Security.NonceVerification.Recommended, sanitization ok.
	?>
	<div class="wrap">
		<h2><?php esc_html_e( 'Nasio Blocks Options', 'nasio-blocks' ); ?></h2>

		<h2 class="nav-tab-wrapper">
			<a href="<?php echo esc_url( admin_url( 'options-general.php?page=nasio_blocks&tab=blocks' ) ); ?>" class="nav-tab <?php echo esc_attr( $active_tab === 'blocks' ? 'nav-tab-active' : '' ); ?>"><?php esc_html_e( 'Blocks', 'nasio-blocks' ); ?></a>
			<a href="<?php echo esc_url( admin_url( 'options-general.php?page=nasio_blocks&tab=faq' ) ); ?>" class="nav-tab <?php echo esc_attr( $active_tab === 'faq' ? 'nav-tab-active' : '' ); ?>"><?php esc_html_e( 'FAQ', 'nasio-blocks' ); ?></a>
		</h2>

		<?php
		switch ( $active_tab ) :
			case 'blocks':
				$saved = get_option(
					'nasio_blocks_enabled_blocks',
					array(
						'post_slider'    => 1,
						'content_slider' => 1,
						'gallery_slider' => 1,
						'icon_block'     => 1,
						'accordion'      => 1,
					)
				);
				?>
				<div class="nasio-blocks-admin-content">
					<h3><?php esc_html_e( 'Available Blocks', 'nasio-blocks' ); ?></h3>
					<p><?php esc_html_e( 'Enable or disable individual blocks:', 'nasio-blocks' ); ?></p>

					<form method="post" action="options.php">
						<?php settings_fields( 'nasio_blocks_settings_group' );
						?>
						<input type="hidden" name="nasio_blocks_enabled_blocks[__submitted]" value="1" />
						<table class="form-table">	
							<tr>
								<th scope="row"><?php esc_html_e( 'Post Slider', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_enabled_blocks[post_slider]" value="1" <?php checked( $saved['post_slider'], 1 ); ?> /> Enable</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e( 'Content Slider', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_enabled_blocks[content_slider]" value="1" <?php checked( $saved['content_slider'], 1 ); ?> /> Enable</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e( 'Gallery Slider', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_enabled_blocks[gallery_slider]" value="1" <?php checked( $saved['gallery_slider'], 1 ); ?> /> Enable</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e( 'Icon Block', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_enabled_blocks[icon_block]" value="1" <?php checked( $saved['icon_block'], 1 ); ?> /> Enable</td>
							</tr>
							<tr>
								<th scope="row"><?php esc_html_e( 'Accordion', 'nasio-blocks' ); ?></th>
								<td><input type="checkbox" name="nasio_blocks_enabled_blocks[accordion]" value="1" <?php checked( $saved['accordion'], 1 ); ?> /> Enable</td>
							</tr>
						</table>
						<?php submit_button( __( 'Save Changes', 'nasio-blocks' ) ); ?>
					</form>
				</div>
				<?php
				break;

			case 'faq':
				include_once NASIO_BLOCKS_PATH . 'templates/faq.php';
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
	$settings_link = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Settings', 'nasio-blocks' ) . '</a>';
	$links[]       = $settings_link;
	return $links;
}

add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'nasio_blocks_settings_link' );

/**
 * Include block directories conditionally
 * Based on the plugin's settings page
 */
$block_directories = array(
	'post_slider'    => 'post-slider/post-slider.php',
	'content_slider' => 'content-slider/content-slider.php',
	'gallery_slider' => 'gallery-slider/gallery-slider.php',
	'icon_block'     => 'icon-block/icon-block.php',
	'accordion'      => 'accordion/accordion.php',
);

foreach ( $block_directories as $block_key => $block_file ) {
	if ( nasio_blocks_is_enabled( $block_key ) ) {
		$block_path = NASIO_BLOCKS_PATH . 'blocks/' . $block_file;
		if ( file_exists( $block_path ) ) {
			require_once $block_path;
		}
	}
}

/**
 * Custom svg icons
 */
require_once NASIO_BLOCKS_PATH . '/assets/svg/svg-icons.php';
