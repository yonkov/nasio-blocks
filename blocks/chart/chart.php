<?php
/**
 * Chart Block
 *
 * A component of the Nasio Blocks plugin that provides a chart block.
 *
 * @package Nasio Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the blocks and all related assets.
 */
function nasio_blocks_chart_block_init() {

	/**
	 * Registers the block(s) metadata from the blocks-manifest.php file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 * The file instructs WordPress which scripts and styles to load so we don't need to manually enqueue them
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) && file_exists( __DIR__ . '/build/blocks-manifest.php' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}

	/**
	 * Registers the block type(s) in the blocks-manifest.php file.
	 */
	$manifest_file = __DIR__ . '/build/blocks-manifest.php';
	if ( ! file_exists( $manifest_file ) ) {
		return;
	}
	
	$manifest_data = require $manifest_file;
	$registry      = WP_Block_Type_Registry::get_instance();

	// Register the chart block
	if ( ! $registry->is_registered( 'nasio-block/chart' ) && isset( $manifest_data['chart'] ) ) {
		register_block_type( __DIR__ . '/build/chart' );
	}
}

add_action( 'init', 'nasio_blocks_chart_block_init' );
