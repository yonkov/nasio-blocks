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
        slidesPerGroup
    } = attributes;

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
        'data-draggable': draggable,
        'data-slides-per-group': slidesPerGroup
    };
    
    // Add slides-per-view only for carousel mode
    if (displayMode === 'carousel') {
        dataAttributes['data-slides-per-view'] = slidesPerView;
    }

    const blockProps = useBlockProps.save({
        className: wrapperClass,
        style: {
            '--slides-per-view': slidesPerView,
            '--space-between': `${spaceBetween}px`,
            '--swiper-navigation-sides-dynamic-offset': `${arrowOffset}px`
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