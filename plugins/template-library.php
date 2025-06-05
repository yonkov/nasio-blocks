<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Woof Woof Woof!' );
}


function nasio_blocks_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'nasio-template-library-script',
		plugins_url( 'assets/js/editor-script.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-edit-post', 'wp-components', 'wp-data', 'wp-editor', 'wp-i18n', 'wp-block-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/editor-script.js' ),
		true
	);

	wp_enqueue_style(
		'nasio-template-library-style',
		plugins_url( 'assets/css/editor-style.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/editor-style.css' )
	);
}
add_action( 'enqueue_block_editor_assets', 'nasio_blocks_enqueue_block_editor_assets' );
