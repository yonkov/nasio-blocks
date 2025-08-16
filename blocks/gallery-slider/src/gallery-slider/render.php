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
    // Handle custom image dimensions
    if (isset($attributes['imageSizeSlug']) && $attributes['imageSizeSlug'] === 'custom') {
        $customWidth = isset($attributes['customImageWidth']) ? $attributes['customImageWidth'] : '';
        $customHeight = isset($attributes['customImageHeight']) ? $attributes['customImageHeight'] : '';
        
        if (!empty($customWidth) || !empty($customHeight)) {
            // Build inline style for custom dimensions
            $inlineStyles = array();
            
            if (!empty($customWidth)) {
                $inlineStyles[] = 'width:' . esc_attr($customWidth);
            }
            
            if (!empty($customHeight)) {
                $inlineStyles[] = 'height:' . esc_attr($customHeight);
            }
            
            // Apply object-fit if both dimensions are specified
            if (!empty($customWidth) && !empty($customHeight)) {
                $inlineStyles[] = 'object-fit:cover';
            }
            
            $styleAttribute = 'style="' . implode(';', $inlineStyles) . '"';
            
            // Add inline styles to all gallery slider images
            $content = preg_replace(
                '/(<img[^>]*class="gallery-slider-image"[^>]*)(>)/',
                '$1 ' . $styleAttribute . '$2',
                $content
            );
        }
    }
    
    return $content;
} 