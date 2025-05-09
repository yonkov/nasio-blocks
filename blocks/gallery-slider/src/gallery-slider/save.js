/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

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
        draggable,
        showCaptions,
        linkTo,
        slidesPerGroup
    } = attributes;

    // If there are no images, don't render anything
    if (!images.length) {
        return null;
    }

    const blockProps = useBlockProps.save({
        className: 'wp-block-nasio-block-gallery-slider',
        'data-slides-per-view': slidesPerView,
        'data-space-between': spaceBetween,
        'data-loop': loop.toString(),
        'data-autoplay': autoplay.toString(),
        'data-autoplay-delay': autoplayDelay,
        'data-show-dots': showDots.toString(),
        'data-show-arrows': showArrows.toString(),
        'data-draggable': draggable.toString(),
        'data-show-captions': showCaptions.toString(),
        'data-link-to': linkTo,
        'data-slides-per-group': slidesPerGroup
    });

    return (
        <div {...blockProps}>
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