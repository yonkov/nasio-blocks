<?php
/**
 * Server-side rendering of the `nasio-block/gallery-slider` block.
 *
 * @package Nasio Blocks
 */

/**
 * Renders the `nasio-block/gallery-slider` block on the server.
 * 
 * The content already contains the complete slider markup from save.js,
 * so we just need to pass it through without adding extra wrapper elements.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the gallery slider with images.
 */
function nasio_blocks_render_gallery_slider( $attributes, $content, $block ) {
    // Simply return the content as-is, since it already contains the complete slider markup
    return $content;
} 