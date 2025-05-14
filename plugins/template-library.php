<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Woof Woof Woof!' );
}


function nasio_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'nasio-template-library-script',
		plugins_url( 'assets/js/editor-script.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-edit-post', 'wp-components', 'wp-data', 'wp-editor', 'wp-i18n' ),
		true,
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/editor-script.js' )
	);

	wp_enqueue_style(
		'nasio-template-library-style',
		plugins_url( 'assets/css/editor-style.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/editor-style.css' )
	);
}
add_action( 'enqueue_block_editor_assets', 'nasio_enqueue_block_editor_assets' );
