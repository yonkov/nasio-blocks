<?php
/**
 * Server-side rendering of the `nasio-block/gallery-slider` block.
 *
 * @package Nasio Blocks
 */

/**
 * Renders the `nasio-block/gallery-slider` block on the server.
 * 
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the gallery slider with images.
 */
function nasio_blocks_render_gallery_slider( $attributes, $content, $block ) {
    // Check if we need to handle custom image sizes
    if (isset($attributes['imageSizeSlug'])) {
        // Handle "uncropped" option - ensure we use the original aspect ratio
        if ($attributes['imageSizeSlug'] === 'uncropped' && !empty($attributes['images'])) {
            // No server-side manipulation needed - the frontend JS already uses full size images
        }
        
        // Handle "custom" dimensions
        if ($attributes['imageSizeSlug'] === 'custom' && 
            !empty($attributes['images'])) {
                
            // The custom dimensions are applied via inline styles in the saved markup
            // The frontend JavaScript (view.js) will respect these dimensions
            
            // No PHP image processing needed because the dimensions are applied via CSS
            // We're using the full-sized image and letting CSS control the dimensions
        }
    }
    
    // Return the content since it already contains the complete slider markup
    return $content;
} 