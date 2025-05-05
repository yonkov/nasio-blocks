<?php
/**
 * Server-side rendering of the `nasio-block/content-slider` block.
 *
 * @package Nasio Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the `nasio-block/content-slider` block on the server.
 * 
 * The content already contains the complete slider markup from save.js,
 * so we just need to pass it through without adding extra wrapper elements.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the slider with content.
 */
function nasio_blocks_render_content_slider( $attributes, $content, $block ) {
    // Simply return the content as-is, since it already contains the complete slider markup
    return $content;
}