<?php
/**
 * Tabs Block Registration
 *
 * @package Nasio_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the block assets for the tabs
 */
function nasio_blocks_tabs_register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$registry = WP_Block_Type_Registry::get_instance();

	if ( ! $registry->is_registered( 'nasio-block/tabs' ) || ! $registry->is_registered( 'nasio-block/tab' ) ) {
		register_block_type( __DIR__ . '/build/tabs' );
		register_block_type( __DIR__ . '/build/tab' );
	}
}
add_action( 'init', 'nasio_blocks_tabs_register_block' );

/**
 * Dequeue the frontend-specific stylesheet (style.scss) from the block editor.
 *
 * The 'style' property in block.json loads the stylesheet in both frontend and editor.
 * This function removes it from the editor to ensure it's frontend-only.
 */
function nasio_blocks_tabs_dequeue_frontend_style_from_editor() {
	wp_dequeue_style( 'nasio-block-tabs-style' );
}
add_action( 'enqueue_block_editor_assets', 'nasio_blocks_tabs_dequeue_frontend_style_from_editor' );
