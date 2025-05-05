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
