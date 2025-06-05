<?php
/**
 * Icon Block
 *
 * A component of the Nasio Blocks plugin that provides an icon block.
 *
 * @package Nasio Blocks
 */

 if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the blocks and all related assets.
 */
function nasio_blocks_icon_block_init() {
	
	/**
	 * Registers the block(s) metadata from the blocks-manifest.php file.
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	
	/**
	 * Registers the block type(s) in the blocks-manifest.php file.
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	$registry = WP_Block_Type_Registry::get_instance();
	
	if (! $registry->is_registered( 'nasio-block/icon-block' ) && isset($manifest_data['icon-block'])) {
		register_block_type( __DIR__ . '/build/icon-block' );
	}
}
add_action( 'init', 'nasio_blocks_icon_block_init' );
