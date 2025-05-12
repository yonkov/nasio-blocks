/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    MediaPlaceholder,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    PanelColorSettings,
    InnerBlocks,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    Button,
    Toolbar,
    __experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
    caption as captionIcon,
    update,
    trash,
    replace
} from '@wordpress/icons';

/**
 * The edit function for the gallery-slider block.
 *
 * @param {Object} props               Block props.
 * @param {Object} props.attributes    Block attributes.
 * @param {Object} props.setAttributes Block setAttributes function.
 * @param {string} props.clientId      Block client ID.
 * @param {string} props.className     Class name from the block editor.
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId, className }) {
    const {
        images,
        ids,
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
        imageSizeSlug,
        slidesPerGroup,
        backgroundColor,
        sliderWidth,
    } = attributes;

    const [selectedImage, setSelectedImage] = useState(null);
    const [editingCaption, setEditingCaption] = useState(null);
    const containerRef = useRef(null);
    const swiperInstanceRef = useRef(null);
    const lastReinitTimeRef = useRef(0);

    // Define allowed blocks and template for the title area
    const ALLOWED_BLOCKS_FOR_TITLE = ['core/paragraph', 'core/heading'];
    const TEMPLATE_FOR_TITLE = [
        ['core/paragraph', { placeholder: __('Add a title or description for the gallery...', 'nasio-blocks') }]
    ];

    // Get the available image sizes
    const { imageSizes } = useSelect((select) => {
        const { getSettings } = select('core/block-editor');
        return {
            imageSizes: getSettings().imageSizes,
        };
    }, []);

    const imageSizeOptions = imageSizes.map(({ name, slug }) => ({
        value: slug,
        label: name,
    }));

    // Set custom CSS variables based on attributes
    const blockProps = useBlockProps({
        className: `wp-block-nasio-block-gallery-slider ${className || ''}`,
        style: {
            '--slides-per-view': slidesPerView,
            '--space-between': `${spaceBetween}px`,
            ...(backgroundColor && { '--nasio-blocks-gallery-slider-background-color': backgroundColor }),
        }
    });

    // Handle image selection
    const onSelectImages = (newImages) => { // newImages are from MediaPlaceholder/MediaUpload
        const newImagesData = newImages.map((image) => ({
            id: image.id.toString(),
            alt: image.alt || '',
            caption: image.caption || '',
            link: image.link || '',
            url: image.sizes?.[imageSizeSlug]?.url || image.url, // Set initial URL based on current imageSizeSlug
            media_sizes: image.sizes, // Store all available sizes for this image
        }));

        setAttributes({
            images: newImagesData,
            ids: newImages.map((image) => image.id), // Keep ids in sync
        });
    };

    // Handle image replacement
    const onReplaceImage = (newMediaItem) => { // Corrected: receives a single media object
        if (!selectedImage || !newMediaItem) { // Check selectedImage (ID of item to replace) and newMediaItem
            return;
        }

        const updatedImages = images.map(img => {
            // If this image in the array is the one we mean to replace
            if (img.id === selectedImage) {
                return {
                    id: newMediaItem.id.toString(),
                    alt: newMediaItem.alt || '',
                    caption: newMediaItem.caption || img.caption || '', // Preserve old caption if new is empty
                    link: newMediaItem.link || img.link || '',       // Preserve old link if new is empty
                    url: newMediaItem.sizes?.[imageSizeSlug]?.url || newMediaItem.url,
                    media_sizes: newMediaItem.sizes, // Store all available sizes for the new image
                };
            }
            return img;
        });

        const newImageIds = updatedImages.map(img => parseInt(img.id));

        setAttributes({
            images: updatedImages,
            ids: newImageIds,
        });

        setSelectedImage(null); // De-select the image slot after replacement

        // Force Swiper to update its view after attributes change
        if (swiperInstanceRef.current) {
            setTimeout(() => {
                // Check if swiper instance still exists, e.g. if block was quickly removed
                if (swiperInstanceRef.current) {
                    swiperInstanceRef.current.update();
                }
            }, 50); // A small delay can help ensure React has re-rendered
        }
    };

    // Handle image removal
    const onRemoveImage = (idToRemove) => {
        const newImages = images.filter((img) => img.id !== idToRemove);
        const newIds = newImages.map(img => parseInt(img.id)); // Rebuild IDs from remaining images

        setAttributes({
            images: newImages,
            ids: newIds,
        });

        if (selectedImage === idToRemove) {
            setSelectedImage(null); // Clear selection if the removed image was selected
        }
    };

    // Handle caption update
    const updateCaption = (newCaption, id) => {
        const newImages = images.map((img) => {
            if (img.id === id) {
                return {
                    ...img,
                    caption: newCaption,
                };
            }
            return img;
        });

        setAttributes({
            images: newImages,
        });
    };

    // Initialize and update Swiper
    useEffect(() => {
        // Initialize Swiper after a short delay to ensure DOM is ready
        const timer = setTimeout(() => {
            initSwiper();
        }, 500);
        
        // Re-initialize the Swiper when block selection changes
        const unsubscribe = wp.data.subscribe(() => {
            const selectedBlock = wp.data.select('core/block-editor').getSelectedBlock();
            if (selectedBlock && selectedBlock.clientId === clientId) {
                // Only reinitialize if we haven't done so recently (debounce)
                const now = Date.now();
                if (now - lastReinitTimeRef.current > 1000) {
                    lastReinitTimeRef.current = now;
                    setTimeout(() => {
                        if (swiperInstanceRef.current) {
                            swiperInstanceRef.current.update();
                        }
                    }, 50);
                }
            }
        });

        return () => {
            // Properly unsubscribe to prevent memory leaks
            unsubscribe();
            clearTimeout(timer);
            
            // Update when content in the editor changes
            if (swiperInstanceRef.current) {
                swiperInstanceRef.current.update();
            }
        };
    }, [
        slidesPerView,
        spaceBetween,
        loop,
        autoplay,
        autoplayDelay,
        showDots,
        showArrows,
        draggable,
        images?.length,
        slidesPerGroup,
    ]);

    // Effect to update image URLs when imageSizeSlug changes
    useEffect(() => {
        if (!images || images.length === 0 || !imageSizeSlug) {
            return;
        }

        let hasChanges = false;
        const updatedImages = images.map(img => {
            // If media_sizes isn't available for an image (e.g., older block prior to this change),
            // we can't update its URL based on size.
            if (!img.media_sizes) {
                return img;
            }

            // Attempt to get the URL for the selected imageSizeSlug.
            // Fallback to 'full' size if available, then to the current img.url as a last resort.
            const newUrl = img.media_sizes[imageSizeSlug]?.url || img.media_sizes.full?.url || img.url;

            if (img.url !== newUrl) {
                hasChanges = true;
                return { ...img, url: newUrl };
            }
            return img;
        });

        if (hasChanges) {
            setAttributes({ images: updatedImages });
        }
    }, [imageSizeSlug, images, setAttributes]);

    // Initialize Swiper
    const initSwiper = () => {
        // Clean up previous Swiper instance if it exists
        if (swiperInstanceRef.current) {
            swiperInstanceRef.current.destroy(true, true);
            swiperInstanceRef.current = null;
        }

        if (containerRef.current && typeof window.Swiper !== 'undefined' && images.length > 0) {
            // Set up Swiper with basic configuration
            const swiperElement = containerRef.current.querySelector('.nasio-gallery-slider');
            
            if (!swiperElement) return;

            // Set up Swiper settings
            const settings = {
                slidesPerView: parseInt(slidesPerView),
                spaceBetween: parseInt(spaceBetween),
                slidesPerGroup: parseInt(slidesPerGroup),
                rewind: loop,
                observer: true,
                observeParents: true,
                resizeObserver: true,
                allowTouchMove: draggable,
                simulateTouch: draggable,
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                preventClicks: false,
                preventClicksPropagation: false,
                touchStartPreventDefault: false,
                touchMoveStopPropagation: false,
                speed: 400,
            };
            
            // Add breakpoints for responsive viewing
            if (parseInt(slidesPerView) > 1) {
                settings.breakpoints = {
                    // Breakpoints use min-width
                    480: {
                        slidesPerView: Math.min(2, parseInt(slidesPerView))
                    },
                    768: {
                        slidesPerView: parseInt(slidesPerView)
                    }
                };
            }

            // Add autoplay if enabled
            if (autoplay) {
                settings.autoplay = {
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                };
            }

            // Add navigation if enabled
            if (showArrows) {
                settings.navigation = {
                    nextEl: swiperElement.querySelector('.swiper-button-next'),
                    prevEl: swiperElement.querySelector('.swiper-button-prev')
                };
            }

            // Add pagination if enabled
            if (showDots) {
                settings.pagination = {
                    el: swiperElement.querySelector('.swiper-pagination'),
                    clickable: true
                };
            }
            
            try {
                // Initialize Swiper
                swiperInstanceRef.current = new window.Swiper(swiperElement, settings);
                
                // Force update after initialization
                setTimeout(() => {
                    if (swiperInstanceRef.current) {
                        swiperInstanceRef.current.update();
                    }
                }, 100);
            } catch (error) {
                console.error('Error initializing Swiper:', error);
            }
        }
    };

    // Revoke blob URLs on unmount
    useEffect(() => {
        return () => {
            if (images && images.length) {
                images.forEach((image) => {
                    if (isBlobURL(image.url)) {
                        revokeBlobURL(image.url);
                    }
                });
            }
        };
    }, []);

    // Handle empty state
    if (images.length === 0) {
        return (
            <div {...blockProps}>
                <MediaPlaceholder
                    icon="format-gallery"
                    labels={{
                        title: __('Gallery Slider', 'nasio-blocks'),
                        instructions: __(
                            'Drag images, upload new ones or select files from your library.',
                            'nasio-blocks'
                        ),
                    }}
                    onSelect={onSelectImages}
                    accept="image/*"
                    allowedTypes={['image']}
                    multiple
                    value={images}
                />
            </div>
        );
    }

    // Block toolbar controls
    const blockControls = (
        <BlockControls>
            <Toolbar>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages} // This is for adding/editing the whole gallery
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={ids} // Use the array of current image IDs
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                icon={update} // Icon for editing the gallery
                                label={__('Edit gallery', 'nasio-blocks')}
                            />
                        )}
                    />
                </MediaUploadCheck>
                {/* Conditionally render controls for a selected image */}
                {selectedImage && (
                    <>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onReplaceImage} // This is for replacing a single image
                                allowedTypes={['image']}
                                multiple={false} // Only allow selecting one image for replacement
                                value={selectedImage ? [parseInt(selectedImage)] : []} // Pass current image ID for context to media modal
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        icon={replace} // Correct icon for replacing an image
                                        label={__('Replace image', 'nasio-blocks')}
                                    />
                                )}
                            />
                        </MediaUploadCheck>
                        <Button
                            onClick={() => onRemoveImage(selectedImage)}
                            icon={trash}
                            label={__('Remove image', 'nasio-blocks')}
                        />
                        {showCaptions && (
                            <Button
                                icon={captionIcon}
                                label={
                                    editingCaption === selectedImage
                                        ? __('Stop editing caption', 'nasio-blocks')
                                        : __('Edit caption', 'nasio-blocks')
                                }
                                onClick={() => {
                                    if (editingCaption === selectedImage) {
                                        setEditingCaption(null);
                                    } else {
                                        setEditingCaption(selectedImage);
                                    }
                                }}
                                isPressed={editingCaption === selectedImage}
                            />
                        )}
                    </>
                )}
            </Toolbar>
        </BlockControls>
    );

    // Gallery slider UI
    return (
        <>
            {blockControls}
            <InspectorControls>
                <PanelBody title={__('Gallery Slider Settings', 'nasio-blocks')}>
                    <RangeControl
                        label={__('Slides Per View', 'nasio-blocks')}
                        value={slidesPerView}
                        help={ __('The number of slides visible on the screen.')}
                        onChange={(value) => setAttributes({ slidesPerView: value })}
                        min={1}
                        max={5}
                    />
                    <RangeControl
                        label={__('Slides Per Group', 'nasio-blocks')}
                        value={slidesPerGroup}
                        help={ __('The number of slides to advance.')}
                        onChange={(value) => setAttributes({ slidesPerGroup: value })}
                        min={1}
                        max={5}
                    />
                    <RangeControl
                        label={__('Space Between Slides (px)', 'nasio-blocks')}
                        value={spaceBetween}
                        onChange={(value) => setAttributes({ spaceBetween: value })}
                        min={0}
                        max={50}
                    />
                    <ToggleControl
                        label={__('Show Dots (Pagination)', 'nasio-blocks')}
                        checked={showDots}
                        onChange={() => setAttributes({ showDots: !showDots })}
                    />
                    <ToggleControl
                        label={__('Show Arrows (Navigation)', 'nasio-blocks')}
                        checked={showArrows}
                        onChange={() => setAttributes({ showArrows: !showArrows })}
                    />
                    <ToggleControl
                        label={__('Drag Slides', 'nasio-blocks')}
                        checked={draggable}
                        onChange={() => setAttributes({ draggable: !draggable })}
                    />
                    <ToggleControl
                        label={__('Loop Slider', 'nasio-blocks')}
                        checked={loop}
                        onChange={() => setAttributes({ loop: !loop })}
                    />
                    <ToggleControl
                        label={__('Autoplay', 'nasio-blocks')}
                        checked={autoplay}
                        onChange={() => setAttributes({ autoplay: !autoplay })}
                    />
                    {autoplay && (
                        <RangeControl
                            label={__('Autoplay Delay (ms)', 'nasio-blocks')}
                            value={autoplayDelay}
                            onChange={(value) => setAttributes({ autoplayDelay: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                    <ToggleControl
                        label={__('Show Captions', 'nasio-blocks')}
                        checked={showCaptions}
                        onChange={() => setAttributes({ showCaptions: !showCaptions })}
                    />
                    <SelectControl
                        label={__('Link To', 'nasio-blocks')}
                        value={linkTo}
                        options={[
                            { value: 'none', label: __('None', 'nasio-blocks') },
                            { value: 'media', label: __('Media File', 'nasio-blocks') },
                            { value: 'attachment', label: __('Attachment Page', 'nasio-blocks') },
                        ]}
                        onChange={(value) => setAttributes({ linkTo: value })}
                    />
                    <SelectControl
                        label={__('Image Size', 'nasio-blocks')}
                        value={imageSizeSlug}
                        options={imageSizeOptions}
                        onChange={(value) => setAttributes({ imageSizeSlug: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelColorSettings
                    title={__('Color', 'nasio-blocks')}
                    initialOpen={true}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (value) => setAttributes({ backgroundColor: value }),
                            label: __('Background Color', 'nasio-blocks'),
                        },
                    ]}
                />
                <PanelBody title={__('Dimensions', 'nasio-blocks')} initialOpen={true}>
                    <UnitControl
                        label={__('Slider Width', 'nasio-blocks')}
                        value={sliderWidth}
                        onChange={(value) => setAttributes({ sliderWidth: value || '' })}
                        help={__('Enter a width for the slider (e.g., 100%, 500px, 50rem). Leave empty for the slider to take the width of its container.', 'nasio-blocks')}
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 100 },
                            { value: 'em', label: 'em', default: 0 },
                            { value: 'rem', label: 'rem', default: 0 },
                            { value: 'vw', label: 'vw', default: 100 },
                        ]}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {images.length === 0 ? (
                    <MediaPlaceholder
                        icon="format-gallery"
                        labels={{
                            title: __('Gallery Slider', 'nasio-blocks'),
                            instructions: __(
                                'Drag images, upload new ones or select files from your library.',
                                'nasio-blocks'
                            ),
                        }}
                        onSelect={onSelectImages}
                        accept="image/*"
                        allowedTypes={['image']}
                        multiple
                        value={images}
                    />
                ) : (
                    <div className="gallery-slider-wrapper" ref={containerRef}>
                        <h3 className="nasio-slider-editor-title">
                            {__('Gallery Slider Preview', 'nasio-blocks')}
                        </h3>
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS_FOR_TITLE}
                            template={TEMPLATE_FOR_TITLE}
                            templateLock={false}
                        />
                        <div className="nasio-gallery-slider swiper">
                            <div className="swiper-wrapper">
                                {images.map((image) => {
                                    const isSelected = selectedImage === image.id;
                                    const isEditing = editingCaption === image.id;

                                    return (
                                        <div 
                                            key={image.id} 
                                            className={`swiper-slide gallery-slider-item ${isSelected ? 'is-selected' : ''}`}
                                            onClick={() => setSelectedImage(image.id)}
                                        >
                                            <figure className="gallery-slider-figure">
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    data-id={image.id}
                                                    data-link={image.link}
                                                    className="gallery-slider-image"
                                                />
                                                {showCaptions && (image.caption || isEditing) && (
                                                    <figcaption className="gallery-slider-caption">
                                                        {isEditing ? (
                                                            <textarea
                                                                value={image.caption}
                                                                onChange={(e) => updateCaption(e.target.value, image.id)}
                                                                autoFocus
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        ) : (
                                                            image.caption
                                                        )}
                                                    </figcaption>
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
                )}
            </div>
        </>
    );
}