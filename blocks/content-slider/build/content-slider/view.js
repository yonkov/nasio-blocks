/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/content-slider/view.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
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
document.addEventListener('DOMContentLoaded', function () {
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
  sliders.forEach(function (slider) {
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
        onlyInViewport: true
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

/**
 * View for the content slider block.
 */
function View() {
  return null;
}
/******/ })()
;
//# sourceMappingURL=view.js.map