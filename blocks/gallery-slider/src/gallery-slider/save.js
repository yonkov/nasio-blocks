/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Block save properties.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const {
        images,
        slidesPerView,
        spaceBetween,
        loop,
        autoplay,
        autoplayDelay,
        showDots,
        showArrows,
        arrowOffset,
        draggable,
        showCaptions,
        linkTo,
        slidesPerGroup,
        imageSizeSlug,
        customImageWidth,
        customImageHeight,
        arrowColor = '#333',
        arrowBackgroundColor,
        paginationActiveColor = '#333',
        paginationInactiveColor = '#ccc'
    } = attributes;

    // If there are no images, don't render anything
    if (!images.length) {
        return null;
    }


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

    const blockProps = useBlockProps.save({
        className: 'wp-block-nasio-block-gallery-slider',
        style: {
            '--space-between': `${spaceBetween}px`,
            '--swiper-navigation-sides-dynamic-offset': `${arrowOffset}px`,
            '--arrow-color': arrowColor,
            ...(arrowBackgroundColor && { '--arrow-bg-color': addOpacityToColor(arrowBackgroundColor, 0.75) }),
            '--pagination-active-color': paginationActiveColor,
            '--pagination-inactive-color': paginationInactiveColor
        },
        'data-slides-per-view': slidesPerView,
        'data-space-between': spaceBetween,
        'data-loop': loop,
        'data-autoplay': autoplay,
        'data-autoplay-delay': autoplayDelay,
        'data-show-dots': showDots,
        'data-show-arrows': showArrows,
        'data-draggable': draggable,
        'data-show-captions': showCaptions,
        'data-link-to': linkTo,
        'data-slides-per-group': slidesPerGroup,
        'data-image-size': imageSizeSlug,
        'data-custom-width': customImageWidth,
        'data-custom-height': customImageHeight
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
            <div className="nasio-gallery-slider swiper">
                <div className="swiper-wrapper">
                    {images.map((image) => {
                        const imgClasses = 'gallery-slider-image';
                        
                        let imgElement = (
                            <img
                                src={image.url}
                                alt={image.alt}
                                data-id={image.id}
                                data-link={image.link}
                                className={imgClasses}
                            />
                        );

                        if (linkTo !== 'none') {
                            const href = linkTo === 'media' ? image.url : image.link;
                            imgElement = (
                                <a href={href} rel="noreferrer noopener">
                                    {imgElement}
                                </a>
                            );
                        }

                        return (
                            <div key={image.id} className="swiper-slide gallery-slider-item">
                                <figure className="gallery-slider-figure">
                                    {imgElement}
                                    {showCaptions && image.caption && (
                                        <figcaption className="gallery-slider-caption">{image.caption}</figcaption>
                                    )}
                                </figure>
                            </div>
                        );
                    })}
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