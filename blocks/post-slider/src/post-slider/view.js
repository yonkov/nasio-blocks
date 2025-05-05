/**
 * WordPress dependencies
 */
import { addFilter } from "@wordpress/hooks";

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
 * Post Slider View script
 * 
 * This script initializes the Swiper on the frontend.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
	initializePostSlider();
});

// Function to initialize all sliders
function initializePostSlider() {
	// Get all post sliders on the page
	const sliders = document.querySelectorAll('.wp-block-nasio-block-post-slider');
	
	if (!sliders.length) return;
	
	// Check if Swiper is loaded
	if (typeof Swiper === 'undefined') {
		console.error('Swiper library not loaded');
		return;
	}

	// Initialize each slider
	sliders.forEach(function(slider) {
		const swiperElement = slider.querySelector('.nasio-post-slider');
		if (!swiperElement) return;
		
		// Get settings from data attributes
		const displayMode = swiperElement.dataset.displayMode || 'carousel';
		const slidesPerView = parseInt(swiperElement.dataset.slidesPerView || 3);
		const spaceBetween = parseInt(swiperElement.dataset.spaceBetween || 20);
		const loop = swiperElement.dataset.loop === 'true';
		const autoplay = swiperElement.dataset.autoplay === 'true';
		const autoplayDelay = parseInt(swiperElement.dataset.autoplayDelay || 3000);
		const showDots = swiperElement.dataset.showDots === 'true';
		const showArrows = swiperElement.dataset.showArrows === 'true';
		const slidesPerGroup = parseInt(swiperElement.dataset.slidesPerGroup || slidesPerView);
		const draggable = swiperElement.dataset.draggable === 'true';
		
		// Base settings for both displayModes
		const settings = {
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			allowTouchMove: draggable,
			simulateTouch: draggable,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			resizeObserver: true,
			rewind: loop
		};
		
		// Different settings based on displayMode
		if (displayMode === 'carousel') {
			settings.slidesPerView = 1;
			settings.slidesPerGroup = 1;
			settings.spaceBetween = spaceBetween;
			
			// Responsive breakpoints
			settings.breakpoints = {
				// When window width is >= 480px
				480: {
					slidesPerView: Math.min(2, slidesPerView),
					slidesPerGroup: Math.min(2, slidesPerGroup),
					spaceBetween: spaceBetween
				},
				// When window width is >= 768px
				768: {
					slidesPerView: slidesPerView,
					slidesPerGroup: slidesPerGroup
				}
			};
		} else {
			// Fullwidth displayMode
			settings.slidesPerView = 1;
			settings.spaceBetween = 0;
		}
		
		// Add autoplay if enabled
		if (autoplay) {
			settings.autoplay = {
				delay: autoplayDelay,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			};
		}
		
		// Add pagination if enabled
		if (showDots) {
			settings.pagination = {
				el: slider.querySelector('.swiper-pagination'),
				clickable: true
			};
		}
		
		// Add navigation if enabled
		if (showArrows) {
			settings.navigation = {
				nextEl: slider.querySelector('.swiper-button-next'),
				prevEl: slider.querySelector('.swiper-button-prev')
			};
		}
		
		try {
			// Check if the slider already has a Swiper instance
			if (swiperElement.swiper) {
				// Destroy existing instance before creating a new one
				swiperElement.swiper.destroy(true, true);
			}
			
			// Initialize Swiper
			new Swiper(swiperElement, settings);
		} catch (error) {
			console.error('Error initializing Swiper:', error);
		}
	});
}
