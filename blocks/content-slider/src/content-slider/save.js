/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        slidesPerView = 3,
        spaceBetween = 20,
        loop = true,
        displayMode = 'carousel',
        autoplay = false,
        autoplayDelay = 3000,
        showDots = true,
        showArrows = true,
        arrowOffset = 8,
        draggable = true,
        slidesPerGroup,
        arrowColor = '#333',
        arrowBackgroundColor,
        paginationActiveColor = '#333',
        paginationInactiveColor = '#ccc'
    } = attributes;

    // Helper function to add opacity to color
    const addOpacityToColor = (color, opacity = 0.75) => {
        if (!color) return color;
        
        // If it's already rgba, return as is
        if (color.includes('rgba')) return color;
        
        // If it's rgb, convert to rgba
        if (color.includes('rgb')) {
            return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
        }
        
        // If it's hex, convert to rgba
        if (color.startsWith('#')) {
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        
        // For named colors or other formats, wrap in rgba if possible
        return color;
    };

    const wrapperClass = `wp-block-nasio-block-content-slider is-display-mode-${displayMode}`;
    
    // Base data attributes
    const dataAttributes = {
        'data-space-between': spaceBetween,
        'data-loop': loop,
        'data-mode': displayMode,
        'data-autoplay': autoplay,
        'data-autoplay-delay': autoplayDelay,
        'data-show-dots': showDots,
        'data-show-arrows': showArrows,
        'data-draggable': draggable
    };
    
    // Add slides-per-view and slides-per-group only for carousel mode
    if (displayMode === 'carousel') {
        dataAttributes['data-slides-per-view'] = slidesPerView;
        dataAttributes['data-slides-per-group'] = slidesPerGroup;
    }

    const blockProps = useBlockProps.save({
        className: wrapperClass,
        style: {
            '--space-between': `${spaceBetween}px`,
            '--swiper-navigation-sides-dynamic-offset': `${arrowOffset}px`,
            '--arrow-color': arrowColor,
            ...(arrowBackgroundColor && { '--arrow-bg-color': addOpacityToColor(arrowBackgroundColor, 0.75) }),
            '--pagination-active-color': paginationActiveColor,
            '--pagination-inactive-color': paginationInactiveColor
        },
        ...dataAttributes,
    });

    return (
        <div {...blockProps}>
            <div className="nasio-content-slider swiper">
                <div className="swiper-wrapper">
                    <InnerBlocks.Content />
                </div>
                {showDots && <div className="swiper-pagination"></div>}
                {showArrows && (
                    <>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </>
                )}
            </div>
        </div>
    );
}