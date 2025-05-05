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
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    Button,
    Toolbar
} from '@wordpress/components';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
    caption as captionIcon,
    update,
    fullscreen,
    trash,
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
    } = attributes;

    const [selectedImage, setSelectedImage] = useState(null);
    const [editingCaption, setEditingCaption] = useState(null);
    const containerRef = useRef(null);
    const swiperInstanceRef = useRef(null);
    const lastReinitTimeRef = useRef(0);

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
        }
    });

    // Handle image selection
    const onSelectImages = (newImages) => {
        const newIds = newImages.map((image) => image.id);
        const newImagesData = newImages.map((image) => ({
            url: image.url,
            alt: image.alt || '',
            id: image.id.toString(),
            caption: image.caption || '',
            link: image.link || '',
        }));

        setAttributes({
            images: newImagesData,
            ids: newIds,
        });
    };

    // Handle image replacement
    const onReplaceImage = (selectedImages) => {
        if (!selectedImage) return;

        const currentImages = [...images];
        const currentIndex = currentImages.findIndex(
            (img) => img.id === selectedImage
        );

        if (currentIndex === -1) return;

        const newImage = selectedImages[0];
        const newImageData = {
            url: newImage.url,
            alt: newImage.alt || '',
            id: newImage.id.toString(),
            caption: newImage.caption || currentImages[currentIndex].caption || '',
            link: newImage.link || currentImages[currentIndex].link || '',
        };

        currentImages[currentIndex] = newImageData;
        const newIds = [...ids];
        newIds[currentIndex] = newImage.id;

        setAttributes({
            images: currentImages,
            ids: newIds,
        });
    };

    // Handle image removal
    const onRemoveImage = (id) => {
        const newImages = images.filter((img) => img.id !== id);
        const newIds = ids.filter((imgId) => imgId !== parseInt(id));

        setAttributes({
            images: newImages,
            ids: newIds,
        });

        if (selectedImage === id) {
            setSelectedImage(null);
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
    ]);

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
                slidesPerGroup: parseInt(slidesPerView),
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
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={ids}
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                icon={update}
                                label={__('Edit gallery', 'nasio-blocks')}
                            />
                        )}
                    />
                </MediaUploadCheck>
                {selectedImage && (
                    <>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onReplaceImage}
                                allowedTypes={['image']}
                                value={selectedImage}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        icon="replace"
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
                        onChange={(value) => setAttributes({ slidesPerView: value })}
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

            <div {...blockProps}>
                <div className="gallery-slider-wrapper" ref={containerRef}>
                    <h3 className="nasio-slider-editor-title">
                        {__('Gallery Slider Preview', 'nasio-blocks')}
                    </h3>
                    
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
            </div>
        </>
    );
} 