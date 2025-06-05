<?php
/**
 * Post Slider Block
 *
 * A component of the Nasio Blocks plugin that provides a post slider block.
 *
 * @package Nasio Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Include the render function
require_once __DIR__ . '/src/post-slider/render.php';

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function nasio_blocks_post_slider_block_init() {
	/**
	 * Registers the block(s) metadata from the blocks-manifest.php file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}

	/**
	 * Registers the block type(s) in the blocks-manifest.php file.
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	$registry      = WP_Block_Type_Registry::get_instance();

	if ( ! $registry->is_registered( 'nasio-block/post-slider' ) && isset( $manifest_data['post-slider'] ) ) {
		register_block_type(
			__DIR__ . '/build/post-slider',
			array(
				'render_callback' => 'nasio_blocks_render_post_slider',
			)
		);
	}
}
add_action( 'init', 'nasio_blocks_post_slider_block_init' );
