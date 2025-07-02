/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    useInnerBlocksProps,
    BlockContextProvider,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl
} from '@wordpress/components';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

// Use the appropriate function based on availability
const useInnerBlocksPropsHook = useInnerBlocksProps || useInnerBlocksPropsCompat;

/**
 * The edit function for the content slider block.
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
        slidesPerView,
        spaceBetween,
        loop,
        displayMode,
        autoplay,
        autoplayDelay,
        showDots,
        showArrows,
        arrowOffset,
        draggable,
        slidesPerGroup,
        arrowColor,
        arrowBackgroundColor,
        paginationActiveColor,
        paginationInactiveColor
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
        
        // For named colors or other formats, return as is
        return color;
    };

    const [isInitialized, setIsInitialized] = useState(false);
    const containerRef = useRef(null);
    const swiperInstanceRef = useRef(null);

    const { innerBlocks } = useSelect(
        (select) => ({
            innerBlocks: select('core/block-editor').getBlocks(clientId),
        }),
        [clientId]
    );

    const { insertBlock, removeBlock } = useDispatch('core/block-editor');

    // Adjust number of slides based on slidesPerView (for new blocks)
    useEffect(() => {
        if (!isInitialized && innerBlocks.length === 2) {
            // Default blocks have only 2 slides, we want to match the default slidesPerView of 3
            // or have 6 slides total as requested
            const desiredSlides = 6;
            const additionalSlides = desiredSlides - innerBlocks.length;

            if (additionalSlides > 0) {
                for (let i = 0; i < additionalSlides; i++) {
                    insertBlock(createBlock('nasio-block/slide'), innerBlocks.length, clientId);
                }
                setIsInitialized(true);
                initSwiper();
            }
        }
    }, [innerBlocks.length, clientId, isInitialized, insertBlock]);

    // Set custom CSS variables based on attributes
    const blockProps = useBlockProps({
        className: `wp-block-nasio-block-content-slider is-display-mode-${displayMode} is-editor-preview ${className || ''}`,
        style: {
            '--space-between': `${spaceBetween}px`,
            '--swiper-navigation-sides-dynamic-offset': `${arrowOffset}px`,
            '--arrow-color': arrowColor,
            ...(arrowBackgroundColor && { '--arrow-bg-color': addOpacityToColor(arrowBackgroundColor, 0.75) }),
            '--pagination-active-color': paginationActiveColor,
            '--pagination-inactive-color': paginationInactiveColor
        }
    });

    // Define the context to pass to child blocks
    const blockContext = {
        'nasio-block/displayMode': displayMode
    };

    // Set up inner blocks props
    const ALLOWED_BLOCKS = ['nasio-block/slide'];
    const TEMPLATE = [['nasio-block/slide'], ['nasio-block/slide']];

    const innerBlocksProps = useInnerBlocksPropsHook(
        { className: 'swiper-wrapper' },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            template: TEMPLATE,
            orientation: 'horizontal',
            renderAppender: false,
        }
    );

    // Initialize and update Swiper
    useEffect(() => {
        
        // Initialize Swiper after a short delay to ensure DOM is ready
        const timer = setTimeout(() => {
            initSwiper();
        }, 500);
        
        // Re-initialize the Swiper when block selection changes
        // This ensures pagination and navigation remain functional
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
            
            // Update swiper when adding slides via the block editor
            if (swiperInstanceRef.current) {
                swiperInstanceRef.current.update();
            }
        };
    }, [
        displayMode,
        slidesPerView,
        spaceBetween,
        loop,
        autoplay,
        autoplayDelay,
        showDots,
        showArrows,
        arrowOffset,
        draggable,
        slidesPerGroup,
        innerBlocks.length,
    ]);

    // Initialize Swiper
    const initSwiper = () => {
        
        // Clean up previous Swiper instance if it exists
        if (swiperInstanceRef.current) {
            swiperInstanceRef.current.destroy(true, true);
            swiperInstanceRef.current = null;
        }

        if (containerRef.current && typeof window.Swiper !== 'undefined') {
            // Set up Swiper with basic configuration
            const swiperElement = containerRef.current.querySelector('.nasio-content-slider');
            
            if (!swiperElement) return;

            // Set up Swiper settings
            const settings = {
                slidesPerView: displayMode === 'carousel' ? parseInt(slidesPerView) : 1,
                spaceBetween: displayMode === 'carousel' ? parseInt(spaceBetween) : 0,
                slidesPerGroup: displayMode === 'carousel' ? parseInt(slidesPerGroup) : 1,
                rewind: loop,
                observer: true,
                observeParents: true,
                resizeObserver: true,
                observeSlideChildren: true,
                allowTouchMove: draggable,
                simulateTouch: draggable,
                preventClicks: false,
                preventClicksPropagation: false,
                touchStartPreventDefault: false,
                touchMoveStopPropagation: false,
            };
            
            // Add specific settings for fullwidth mode
            if (displayMode === 'fullwidth') {
                // Exactly match the code from view.js for fullwidth mode
                settings.slidesPerView = 1;
                // Adjust speed for smoother handling
                settings.speed = 300;
            }
            
            // Add specific settings for carousel mode
            if (displayMode === 'carousel') {
                // Adjust speed for smoother handling
                settings.speed = 400;
                
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
                // Initialize Swiper for both modes
                swiperInstanceRef.current = new window.Swiper(swiperElement, settings);
            } catch (error) {
                console.error('Error initializing Swiper:', error);
            }
        }
    };

    // Create a ref to track the last reinit time for debouncing
    const lastReinitTimeRef = useRef(0);

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody
                    title={
                        displayMode === 'carousel'
                            ? __('Carousel Settings', 'nasio-blocks')
                            : __('Slider Settings', 'nasio-blocks')
                    }
                >   
                    <SelectControl
                        label={__('Display Mode', 'nasio-blocks')}
                        value={displayMode}
                        help={__(
                            'Choose the content carousel if you want to display multiple columns. The fullwidth slider mode is perfect for fullwidth slides.',
                            'nasio-blocks',
                        )}
                        options={[
                            { label: __('Carousel', 'nasio-blocks'), value: 'carousel' },
                            {
                                label: __('Fullwidth Slider', 'nasio-blocks'),
                                value: 'fullwidth',
                            },
                        ]}
                        onChange={(value) => setAttributes({ displayMode: value })}
                    />
                    {displayMode === 'carousel' && (
                        <>
                            <RangeControl
                                label={__('Slides Per View', 'nasio-blocks')}
                                value={slidesPerView}
                                onChange={(value) => setAttributes({ slidesPerView: value })}
                                min={1}
                                max={5}
                                help={__('The number of slides visible on the screen.', 'nasio-blocks')}
                            />
                            <RangeControl
                                label={__('Slides Per Group', 'nasio-blocks')}
                                value={slidesPerGroup}
                                onChange={(value) => setAttributes({ slidesPerGroup: value })}
                                min={1}
                                max={5}
                                help={__('The number of slides to advance.', 'nasio-blocks')}
                            />
                            <RangeControl
                                label={__('Space Between Slides (px)', 'nasio-blocks')}
                                value={spaceBetween}
                                onChange={(value) => setAttributes({ spaceBetween: value })}
                                min={0}
                                max={50}
                            />
                        </>
                    )}
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
                        label={
                            displayMode === 'carousel'
                                ? __('Loop Carousel', 'nasio-blocks')
                                : __('Loop Slider', 'nasio-blocks')
                        }
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

            <div className="content-slider-wrapper" ref={containerRef}>
                <h3 className="nasio-slider-editor-title">
                    {displayMode === 'fullwidth' 
                        ? __('Content Slider Preview', 'nasio-blocks') 
                        : __('Content Carousel Preview', 'nasio-blocks')}
                </h3>
                
                <BlockContextProvider value={blockContext}>
                    <div className="nasio-content-slider swiper">
                        <div {...innerBlocksProps} />
                        
                        {showDots && <div className="swiper-pagination"></div>}
                        
                        {showArrows && (
                            <>
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>
                            </>
                        )}
                    </div>
                </BlockContextProvider>
            </div>
        </div>
    );
}