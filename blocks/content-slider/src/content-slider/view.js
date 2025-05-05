/**
 * Frontend JavaScript for the content slider block.
 */

/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is imported by index.js, it runs in the context of the editor.
 * When this file is compiled as part of the build process and loaded in the front end,
 * it runs in the context of the front end.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/**
 * Content Slider View script
 * 
 * This script initializes the Swiper on the frontend.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
	// Then initialize the sliders
	initializeContentSlider();
});

function initializeContentSlider() {
    const sliders = document.querySelectorAll('.wp-block-nasio-block-content-slider');
    
    if (!sliders.length) return;
    
    if (typeof Swiper === 'undefined') {
        console.error('Swiper library not loaded');
        return;
    }

    sliders.forEach(function(slider) {
        const swiperElement = slider.querySelector('.nasio-content-slider');
        if (!swiperElement) return;
        
        // Prevent re-initialization
        if (swiperElement.swiper) return;

        // Check if we're in fullwidth or carousel mode
        const isFullwidth = slider.dataset.mode === 'fullwidth';
        const loop = slider.dataset.loop === 'true';
        const draggable = slider.dataset.draggable === 'true';

        // Base settings that apply to both modes
        const settings = {
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
            
            // Add autoplay if enabled
            autoplay: slider.dataset.autoplay === 'true' ? {
                delay: parseInt(slider.dataset.autoplayDelay || 3000),
                disableOnInteraction: false
            } : false
        };
        
        // Add navigation if enabled
        if (slider.dataset.showArrows === 'true') {
            settings.navigation = {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev')
            };
        }
        
        // Add pagination if enabled
        if (slider.dataset.showDots === 'true') {
            settings.pagination = {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true
            };
        }

        // Different settings based on display mode
        if (isFullwidth) {
            // Fullwidth mode settings
            settings.slidesPerView = 1;
            
            // Ensure virtual slides work properly in fullwidth mode
            if (loop) {
                settings.loopAdditionalSlides = 1;
            }
        } else {
            // Carousel mode settings
            const desiredSlidesPerView = parseInt(slider.dataset.slidesPerView || 3);
            
            // For carousel mode, make sure pagination shows correct number of pages
            settings.slidesPerGroup = desiredSlidesPerView;
            
            // Responsive breakpoints
            settings.slidesPerView = 1; // Default for mobile
            settings.slidesPerGroup = 1; // Default for mobile

            settings.spaceBetween = parseInt(slider.dataset.spaceBetween || 20);
            
            settings.breakpoints = {
                480: {
                    slidesPerView: Math.min(2, desiredSlidesPerView),
                    slidesPerGroup: Math.min(2, desiredSlidesPerView)
                },
                768: {
                    slidesPerView: desiredSlidesPerView,
                    slidesPerGroup: desiredSlidesPerView
                }
            };
        }

        try {
            new Swiper(swiperElement, settings);
        } catch (error) {
            console.error('Error initializing Swiper:', error);
        }
    });
}
