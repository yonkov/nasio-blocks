/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/post-slider/view.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
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
 * Post Slider View script
 * 
 * This script initializes the Swiper on the frontend.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
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
  sliders.forEach(function (slider) {
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
        onlyInViewport: true
      },
      resizeObserver: true
    };

    // Different settings based on displayMode
    if (displayMode === 'carousel') {
      // Carousel displayMode
      settings.slidesPerView = 1; // Start with 1 for mobile
      settings.slidesPerGroup = 1; // Start with 1 for mobile
      settings.spaceBetween = spaceBetween;
      settings.rewind = loop; // Use rewind instead of loop for better performance

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
      settings.effect = 'fade';
      settings.fadeEffect = {
        crossFade: true
      };
      settings.loop = loop; // Use regular loop for fade effect
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
        initializePostSlider();
      }, 50);
    }
  });
}

/**
 * View for the post slider block.
 */
function View() {
  return null;
}
})();

/******/ })()
;
//# sourceMappingURL=view.js.map