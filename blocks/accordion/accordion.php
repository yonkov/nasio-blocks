<?php
/**
 * Accordion Block Registration
 *
 * @package Nasio_Blocks
 */

 if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the block assets for the accordion
 */
function nasio_blocks_accordion_register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register parent accordion block.
	register_block_type( __DIR__ . '/build/accordion' );

	// Register child accordion item block.
	register_block_type( __DIR__ . '/build/accordion-item' );
}
add_action( 'init', 'nasio_blocks_accordion_register_block' );

/**
 * Dequeue the frontend-specific stylesheet (style.scss) from the block editor.
 *
 * The 'style' property in block.json loads the stylesheet in both frontend and editor.
 * This function removes it from the editor to ensure it's frontend-only.
 */
function nasio_blocks_accordion_dequeue_frontend_style_from_editor() {
	wp_dequeue_style( 'nasio-block-accordion-style' );
}
add_action( 'enqueue_block_editor_assets', 'nasio_blocks_accordion_dequeue_frontend_style_from_editor' );
