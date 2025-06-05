<?php
/**
 * Gallery Slider Block
 *
 * A component of the Nasio Blocks plugin that provides a gallery slider block.
 *
 * @package Nasio Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Include the render function
require_once __DIR__ . '/src/gallery-slider/render.php';

/**
 * Registers the blocks and all related assets.
 */
function nasio_blocks_gallery_slider_block_init() {

	/**
	 * Registers the block(s) metadata from the blocks-manifest.php file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 * The file instructs WordPress which scripts and styles to load so we don't need to manually enqueue them
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}

	/**
	 * Registers the block type(s) in the blocks-manifest.php file.
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	$registry      = WP_Block_Type_Registry::get_instance();

	if ( ! $registry->is_registered( 'nasio-block/gallery-slider' ) && isset( $manifest_data['gallery-slider'] ) ) {
		register_block_type(
			__DIR__ . '/build/gallery-slider',
			array(
				'render_callback' => 'nasio_blocks_render_gallery_slider',
			)
		);
	}
}
add_action( 'init', 'nasio_blocks_gallery_slider_block_init' );
