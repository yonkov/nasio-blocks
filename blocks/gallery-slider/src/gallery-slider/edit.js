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
    InnerBlocks,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    Button,
    Toolbar,
    __experimentalUnitControl as UnitControl,
    __experimentalText as Text,
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
        customImageWidth,
        customImageHeight,
        arrowOffset,
        arrowColor,
        arrowBackgroundColor,
        paginationActiveColor,
        paginationInactiveColor
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

    // Add standard image size options plus custom option
    const imageSizeOptions = [
        ...imageSizes.map(({ name, slug }) => ({
            value: slug,
            label: name,
        })),
        // Add custom dimensions option
        { value: 'custom', label: __('Custom', 'nasio-blocks') }
    ];


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
        
        return color;
    };

    // Set custom CSS variables based on attributes
    const blockProps = useBlockProps({
        className: `wp-block-nasio-block-gallery-slider ${className || ''}`,
        style: {
            '--space-between': `${spaceBetween}px`,
            '--swiper-navigation-sides-dynamic-offset': `${arrowOffset}px`,
             '--arrow-color': arrowColor,
            ...(arrowBackgroundColor && { '--arrow-bg-color': addOpacityToColor(arrowBackgroundColor, 0.75) }),
            '--pagination-active-color': paginationActiveColor,
            '--pagination-inactive-color': paginationInactiveColor
        }
    });

    // Handle image selection
    const onSelectImages = (newImages) => {
        const newImagesData = newImages.map((image) => {
            let imageUrl;
            
            // Determine which URL to use based on the selected image size
            if (imageSizeSlug === 'custom') {
                // For custom dimensions, use the full size image
                imageUrl = image.sizes?.full?.url || image.url;
            } else {
                // For standard WordPress image sizes
                imageUrl = image.sizes?.[imageSizeSlug]?.url || image.sizes?.full?.url || image.url;
            }
            
            // Store image dimensions for reference
            const dimensions = image.sizes?.full 
                ? { width: image.sizes.full.width, height: image.sizes.full.height }
                : { width: image.width, height: image.height };
            
            return {
                id: image.id.toString(),
                alt: image.alt || '',
                caption: image.caption || '',
                link: image.link || '',
                url: imageUrl,
                media_sizes: image.sizes,
                originalWidth: dimensions.width,
                originalHeight: dimensions.height
            };
        });

        setAttributes({
            images: newImagesData,
            ids: newImages.map((image) => image.id), // Keep ids in sync
        });
    };

    // Handle image replacement
    const onReplaceImage = (newMediaItem) => { // Receives a single media object
        if (!selectedImage || !newMediaItem) { // Check selectedImage (ID of item to replace) and newMediaItem
            return;
        }

        const updatedImages = images.map(img => {
            // If this image in the array is the one we mean to replace
            if (img.id === selectedImage) {
                let imageUrl;
                
                // Determine which URL to use based on the selected image size
                if (imageSizeSlug === 'custom') {
                    // For custom dimensions, use the full size image
                    imageUrl = newMediaItem.sizes?.full?.url || newMediaItem.url;
                } else {
                    // For standard WordPress image sizes
                    imageUrl = newMediaItem.sizes?.[imageSizeSlug]?.url || newMediaItem.sizes?.full?.url || newMediaItem.url;
                }
                
                // Store image dimensions for reference
                const dimensions = newMediaItem.sizes?.full 
                    ? { width: newMediaItem.sizes.full.width, height: newMediaItem.sizes.full.height }
                    : { width: newMediaItem.width, height: newMediaItem.height };
                
                return {
                    id: newMediaItem.id.toString(),
                    alt: newMediaItem.alt || '',
                    caption: newMediaItem.caption || img.caption || '',
                    link: newMediaItem.link || img.link || '',
                    url: imageUrl,
                    media_sizes: newMediaItem.sizes,
                    originalWidth: dimensions.width,
                    originalHeight: dimensions.height
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
                if (swiperInstanceRef.current) {
                    swiperInstanceRef.current.update();
                }
            }, 50);
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
        arrowOffset,
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

            let newUrl = null;

            // Handle image size selection
            if (imageSizeSlug === 'custom') {
                // For custom dimensions, we'll use the original full size image
                // In a production environment, you might want to implement an API call to get resized images
                newUrl = img.media_sizes?.full?.url || img.url;
                
                // We could implement custom image resizing here in the future,
                // but for now we'll use the full size image and apply CSS dimensions
            } else {
                // For standard WordPress image sizes, try to get the appropriate URL
                newUrl = img.media_sizes[imageSizeSlug]?.url || img.media_sizes.full?.url || img.url;
            }

            if (img.url !== newUrl) {
                hasChanges = true;
                return { ...img, url: newUrl };
            }
            return img;
        });

        if (hasChanges) {
            setAttributes({ images: updatedImages });
        }

        // If using custom dimensions, we need to get proper URLs through the WordPress REST API
        if (imageSizeSlug === 'custom' && ids.length) {
            // For a complete implementation, we would integrate with WordPress image processing API
            // For now, we'll use full size images with CSS styling for custom dimensions
        }
    }, [imageSizeSlug, customImageWidth, customImageHeight, images, ids, setAttributes]);

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
                loop: loop,
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
                        max={6}
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
                    {showArrows && (
                        <RangeControl
                            label={__("Arrow Offset (px)", "nasio-blocks")}
                            value={arrowOffset}
                            onChange={(value) => setAttributes({ arrowOffset: value })}
                            min={-80}
                            max={20}
                            help={__("Choose how to position the arrows relative to the slider. Negative values move the arrows outside the slider.", "nasio-blocks")}
                        />
                    )}
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
                        help={__('Select an image size or choose Custom Dimensions for specific width/height', 'nasio-blocks')}
                    />
                    
                    {imageSizeSlug === 'custom' && (
                        <>
                            <div className="custom-image-dimensions">
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                                    <div style={{ flex: 1 }}>
                                        <UnitControl
                                            label={__('Width', 'nasio-blocks')}
                                            value={customImageWidth || ''}
                                            onChange={(value) => {
                                                // Handle unit conversions and properly store values
                                                if (value === '') {
                                                    setAttributes({ customImageWidth: '' });
                                                } else {
                                                    setAttributes({ customImageWidth: value });
                                                }
                                            }}
                                            units={[
                                                { value: 'px', label: 'px', default: 0 },
                                                { value: 'rem', label: 'rem', default: 0 }
                                            ]}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <UnitControl
                                            label={__('Height', 'nasio-blocks')}
                                            value={customImageHeight || ''}
                                            onChange={(value) => {
                                                // Handle unit conversions and properly store values
                                                if (value === '') {
                                                    setAttributes({ customImageHeight: '' });
                                                } else {
                                                    setAttributes({ customImageHeight: value });
                                                }
                                            }}
                                            units={[
                                                { value: 'px', label: 'px', default: 0 },
                                                { value: 'rem', label: 'rem', default: 0 }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

           <InspectorControls group="styles">
                {showArrows && (
                    <PanelColorSettings
                        title={__("Arrows Colors", "nasio-blocks")}
                        colorSettings={[
                            {
                                value: arrowColor,
                                onChange: (color) => setAttributes({ arrowColor: color || '#333' }),
                                label: __("Arrows Color", "nasio-blocks"),
                                disableCustomColors: false,
                                clearable: false,
                            },
                            {
                                value: arrowBackgroundColor,
                                onChange: (color) => setAttributes({ arrowBackgroundColor: color }),
                                label: __("Arrows Background Color", "nasio-blocks"),
                                disableCustomColors: false,
                                clearable: true,
                            },
                        ]}
                    />
                )}
                {showDots && (
                    <PanelColorSettings
                        title={__("Dots Colors", "nasio-blocks")}
                        colorSettings={[
                            {
                                value: paginationInactiveColor,
                                onChange: (color) => setAttributes({ paginationInactiveColor: color || '#ccc' }),
                                label: __("Dots Color", "nasio-blocks"),
                                disableCustomColors: false,
                                clearable: false,
                            },
                            {
                                value: paginationActiveColor,
                                onChange: (color) => setAttributes({ paginationActiveColor: color || '#333' }),
                                label: __("Active Dot Color", "nasio-blocks"),
                                disableCustomColors: false,
                                clearable: false,
                            },
                        ]}
                    />
                )}
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
                                                    style={
                                                        imageSizeSlug === 'custom' && (customImageWidth || customImageHeight) ? {
                                                            width: customImageWidth || undefined,
                                                            height: customImageHeight || undefined,
                                                            objectFit: (customImageWidth && customImageHeight) ? 'cover' : undefined
                                                        } : undefined
                                                    }
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