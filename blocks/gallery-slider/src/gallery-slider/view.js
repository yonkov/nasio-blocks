/**
 * Frontend JavaScript for the gallery slider block.
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
 * Gallery Slider View script
 * 
 * This script initializes the Swiper on the frontend.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Then initialize the sliders
    initializeGallerySlider();
});

function initializeGallerySlider() {
    const sliders = document.querySelectorAll('.wp-block-nasio-block-gallery-slider');
    
    if (!sliders.length) return;
    
    if (typeof Swiper === 'undefined') {
        console.error('Swiper library not loaded');
        return;
    }

    sliders.forEach(function(slider) {
        const swiperElement = slider.querySelector('.nasio-gallery-slider');
        if (!swiperElement) return;
        
        // Prevent re-initialization
        if (swiperElement.swiper) return;

        const loop = slider.dataset.loop === 'true';
        const draggable = slider.dataset.draggable === 'true';
        const desiredSlidesPerView = parseInt(slider.dataset.slidesPerView || 3);
        const spaceBetween = parseInt(slider.dataset.spaceBetween || 20);

        // Base settings that apply to all gallery sliders
        const settings = {
            slidesPerView: 1, // Default for mobile
            spaceBetween: spaceBetween,
            slidesPerGroup: 1, // Default for mobile
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
            } : false,
            
            // Responsive breakpoints
            breakpoints: {
                480: {
                    slidesPerView: Math.min(2, desiredSlidesPerView),
                    slidesPerGroup: Math.min(2, desiredSlidesPerView)
                },
                768: {
                    slidesPerView: desiredSlidesPerView,
                    slidesPerGroup: desiredSlidesPerView
                }
            }
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

        try {
            new Swiper(swiperElement, settings);
        } catch (error) {
            console.error('Error initializing Swiper:', error);
        }
    });
}

// Add event listener for block editor changes if we're in the editor
if (typeof wp !== 'undefined' && wp.data && wp.data.subscribe) {
    // This will help reinitialize when editor changes happen
    let lastChangeTime = 0;
    wp.data.subscribe(() => {
        const now = Date.now();
        // Only reinitialize after a delay and not too frequently
        if (now - lastChangeTime > 1000) {
            lastChangeTime = now;
            setTimeout(() => {
                initializeGallerySlider();
            }, 50);
        }
    });
}

/**
 * View for the gallery slider block.
 */
export function View() {
    return null;
} 