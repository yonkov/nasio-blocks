/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content-slider/block.json":
/*!***************************************!*\
  !*** ./src/content-slider/block.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"version":"0.0.1.40","name":"nasio-block/content-slider","title":"Content Slider","category":"nasio-blocks","icon":"slides","description":"Create a customizable slider with your own content blocks.","keywords":["slider","carousel","content","slideshow"],"supports":{"html":false,"align":["wide","full"]},"textdomain":"nasio-blocks","attributes":{"slidesPerView":{"type":"number","default":3},"spaceBetween":{"type":"number","default":20},"sliderHeight":{"type":"number","default":480},"displayMode":{"type":"string","default":"carousel"},"effect":{"type":"string","default":"slide"},"loop":{"type":"boolean","default":true},"autoplay":{"type":"boolean","default":false},"autoplayDelay":{"type":"number","default":3000},"showDots":{"type":"boolean","default":true},"showArrows":{"type":"boolean","default":true},"draggable":{"type":"boolean","default":true}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

/***/ }),

/***/ "./src/content-slider/edit.js":
/*!************************************!*\
  !*** ./src/content-slider/edit.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * WordPress dependencies
 */







// Use the appropriate function based on availability

const useInnerBlocksPropsHook = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useInnerBlocksProps || useInnerBlocksPropsCompat;

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
function Edit({
  attributes,
  setAttributes,
  clientId,
  className
}) {
  const {
    slidesPerView,
    spaceBetween,
    sliderHeight,
    loop,
    displayMode,
    autoplay,
    autoplayDelay,
    showDots,
    showArrows,
    draggable
  } = attributes;
  const [isInitialized, setIsInitialized] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const containerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const swiperInstanceRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);

  // Check if we're in the editor
  const isEditor = typeof window !== 'undefined' && window.wp && window.wp.data && window.wp.blocks;

  // Get the selectBlock function
  const {
    selectBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/block-editor');
  const {
    innerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => ({
    innerBlocks: select('core/block-editor').getBlocks(clientId)
  }), [clientId]);
  const {
    insertBlock,
    removeBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/block-editor');

  // Adjust number of slides based on slidesPerView (for new blocks)
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!isInitialized && innerBlocks.length === 2) {
      // Default blocks have only 2 slides, we want to match the default slidesPerView of 3
      // or have 6 slides total as requested
      const desiredSlides = 6;
      const additionalSlides = desiredSlides - innerBlocks.length;
      if (additionalSlides > 0) {
        for (let i = 0; i < additionalSlides; i++) {
          insertBlock((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.createBlock)('nasio-block/slide'), innerBlocks.length, clientId);
        }
        setIsInitialized(true);
      }
    }
  }, [innerBlocks.length, clientId, isInitialized, insertBlock]);

  // Set custom CSS variables based on attributes
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `wp-block-nasio-block-content-slider is-display-mode-${displayMode} is-editor-preview ${className || ''}`,
    style: {
      '--slides-per-view': slidesPerView,
      '--space-between': `${spaceBetween}px`,
      '--slider-height': displayMode === 'fullwidth' ? `${sliderHeight}px` : 'auto'
    }
  });

  // Define the context to pass to child blocks
  const blockContext = {
    'nasio-block/displayMode': displayMode
  };

  // Set up inner blocks props
  const ALLOWED_BLOCKS = ['nasio-block/slide'];
  const TEMPLATE = [['nasio-block/slide'], ['nasio-block/slide']];
  const innerBlocksProps = useInnerBlocksPropsHook({
    className: 'swiper-wrapper'
  }, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: TEMPLATE,
    orientation: 'horizontal',
    renderAppender: false
  });

  // Add a helper function to select inner blocks
  const selectInnerBlock = blockClientId => {
    if (blockClientId) {
      // Use setTimeout to ensure this happens after the default selection
      setTimeout(() => {
        selectBlock(blockClientId);
      }, 10);
    }
  };

  // Initialize and destroy Swiper
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
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

      // Update instead of destroying to prevent breaking when adding slides
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.update();
      }
    };
  }, [displayMode, slidesPerView, spaceBetween, sliderHeight, loop, autoplay, autoplayDelay, showDots, showArrows, draggable, innerBlocks.length]);

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

      // Get all slide blocks - use a more specific selector to only get direct children
      // that are slide blocks to avoid any duplicate counting
      const slideElements = Array.from(swiperElement.querySelectorAll('.block-editor-block-list__layout > .wp-block-nasio-block-slide'));

      // Ensure all slides have the swiper-slide class
      slideElements.forEach((slide, index) => {
        slide.classList.add('swiper-slide');
      });

      // Set up Swiper settings
      const settings = {
        slidesPerView: displayMode === 'carousel' ? parseInt(slidesPerView) : 1,
        spaceBetween: displayMode === 'carousel' ? parseInt(spaceBetween) : 0,
        slidesPerGroup: displayMode === 'carousel' ? parseInt(slidesPerView) : 1,
        rewind: loop,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        observeSlideChildren: true,
        allowTouchMove: draggable,
        simulateTouch: draggable,
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        preventClicks: false,
        preventClicksPropagation: false,
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false
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
          pauseOnMouseEnter: true
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

        // For carousel mode, we need to ensure pagination shows correct number of pages
        if (displayMode === 'carousel') {
          // This makes pagination respect slidesPerGroup/slidesPerView
          // and show correct number of pagination bullets
          settings.slidesPerGroup = parseInt(slidesPerView);
        }
      }
      try {
        // Initialize Swiper for both modes
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

  // Create a ref to track the last reinit time for debouncing
  const lastReinitTimeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(0);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: displayMode === 'carousel' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Carousel Settings', 'nasio-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Slider Settings', 'nasio-blocks'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display Mode', 'nasio-blocks'),
          value: displayMode,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choose the content carousel if you want to display multiple columns. The fullwidth slider mode is perfect for fullwidth slides.', 'nasio-blocks'),
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Carousel', 'nasio-blocks'),
            value: 'carousel'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Fullwidth Slider', 'nasio-blocks'),
            value: 'fullwidth'
          }],
          onChange: value => setAttributes({
            displayMode: value
          })
        }), displayMode === 'carousel' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Slides Per View', 'nasio-blocks'),
            value: slidesPerView,
            onChange: value => setAttributes({
              slidesPerView: value
            }),
            min: 1,
            max: 5
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Space Between Slides (px)', 'nasio-blocks'),
            value: spaceBetween,
            onChange: value => setAttributes({
              spaceBetween: value
            }),
            min: 0,
            max: 50
          })]
        }), displayMode === 'fullwidth' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Slider height (px)', 'nasio-blocks'),
          value: sliderHeight,
          onChange: value => setAttributes({
            sliderHeight: value
          }),
          min: 250,
          max: 1000
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Dots (Pagination)', 'nasio-blocks'),
          checked: showDots,
          onChange: () => setAttributes({
            showDots: !showDots
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Arrows (Navigation)', 'nasio-blocks'),
          checked: showArrows,
          onChange: () => setAttributes({
            showArrows: !showArrows
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Drag Slides', 'nasio-blocks'),
          checked: draggable,
          onChange: () => setAttributes({
            draggable: !draggable
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: displayMode === 'carousel' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loop Carousel', 'nasio-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loop Slider', 'nasio-blocks'),
          checked: loop,
          onChange: () => setAttributes({
            loop: !loop
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Autoplay', 'nasio-blocks'),
          checked: autoplay,
          onChange: () => setAttributes({
            autoplay: !autoplay
          })
        }), autoplay && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Autoplay Delay (ms)', 'nasio-blocks'),
          value: autoplayDelay,
          onChange: value => setAttributes({
            autoplayDelay: value
          }),
          min: 1000,
          max: 10000,
          step: 500
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "content-slider-wrapper",
      ref: containerRef,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "nasio-slider-editor-title",
        children: displayMode === 'fullwidth' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content Slider Preview', 'nasio-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content Carousel Preview', 'nasio-blocks')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockContextProvider, {
        value: blockContext,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "nasio-content-slider swiper",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            ...innerBlocksProps
          }), showDots && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "swiper-pagination"
          }), showArrows && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "swiper-button-prev"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "swiper-button-next"
            })]
          })]
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./src/content-slider/editor.scss":
/*!****************************************!*\
  !*** ./src/content-slider/editor.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/content-slider/index.js":
/*!*************************************!*\
  !*** ./src/content-slider/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/content-slider/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/content-slider/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/content-slider/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/content-slider/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/content-slider/block.json");
/* harmony import */ var _slide__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./slide */ "./src/content-slider/slide/index.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * Lets webpack process CSS, SASS or SCSS files specifically for the editor.
 * These styles are applied only in the editor and not to the frontend.
 */


/**
 * Internal dependencies
 */




// Import Slide block components


/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/content-slider/save.js":
/*!************************************!*\
  !*** ./src/content-slider/save.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


function save({
  attributes
}) {
  const {
    slidesPerView = 3,
    spaceBetween = 20,
    sliderHeight = 480,
    loop = true,
    displayMode = 'carousel',
    autoplay = false,
    autoplayDelay = 3000,
    showDots = true,
    showArrows = true,
    draggable = true
  } = attributes;
  const wrapperClass = `wp-block-nasio-block-content-slider is-display-mode-${displayMode}`;

  // Base data attributes
  const dataAttributes = {
    'data-space-between': spaceBetween,
    'data-loop': loop,
    'data-mode': displayMode,
    'data-autoplay': autoplay,
    'data-autoplay-delay': autoplayDelay,
    'data-show-dots': showDots,
    'data-show-arrows': showArrows,
    'data-draggable': draggable
  };

  // Add slides-per-view only for carousel mode
  if (displayMode === 'carousel') {
    dataAttributes['data-slides-per-view'] = slidesPerView;
  }
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: wrapperClass,
    style: {
      '--slides-per-view': slidesPerView,
      '--space-between': `${spaceBetween}px`,
      '--slider-height': displayMode === 'fullwidth' ? `${sliderHeight}px` : undefined // Save slider height for frontend
    },
    ...dataAttributes
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "nasio-content-slider swiper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "swiper-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})
      }), showDots && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "swiper-pagination"
      }), showArrows && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "swiper-button-prev"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "swiper-button-next"
        })]
      })]
    })
  });
}

/***/ }),

/***/ "./src/content-slider/slide/block.json":
/*!*********************************************!*\
  !*** ./src/content-slider/slide/block.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"nasio-block/slide","title":"Slide","category":"nasio-blocks","icon":"slides","description":"Individual slide for the content slider.","parent":["nasio-block/content-slider"],"usesContext":["nasio-block/displayMode"],"supports":{"html":false,"reusable":false},"textdomain":"nasio-blocks"}');

/***/ }),

/***/ "./src/content-slider/slide/edit.js":
/*!******************************************!*\
  !*** ./src/content-slider/slide/edit.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SlideEdit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * The edit function for the slide block.
 *
 * @param {Object} props               Block props.
 * @param {Object} props.attributes    Block attributes.
 * @param {string} props.clientId      Block client ID.
 * @return {WPElement} Element to render.
 */

function SlideEdit({
  attributes,
  clientId
}) {
  const {
    className
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: `${className ? className : ''} swiper-slide nasio-slide`
  });

  // Setup inner blocks with required templates
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useInnerBlocksProps)({}, {
    template: [['core/cover', {
      customOverlayColor: '#000000',
      dimRatio: 40,
      isDark: true
    }, [['core/heading', {
      placeholder: 'Add slide title...',
      textColor: 'white',
      level: 2
    }]]]],
    templateLock: false,
    allowedBlocks: ['core/cover']
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: innerBlocksProps.children
  });
}

/***/ }),

/***/ "./src/content-slider/slide/index.js":
/*!*******************************************!*\
  !*** ./src/content-slider/slide/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/content-slider/slide/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/content-slider/slide/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/content-slider/slide/block.json");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/**
 * Register the slide block.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/content-slider/slide/save.js":
/*!******************************************!*\
  !*** ./src/content-slider/slide/save.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * The save function for the slide block.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */

function save({
  attributes
}) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: 'nasio-slide swiper-slide'
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "nasio-slide-inner",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})
    })
  });
}

/***/ }),

/***/ "./src/content-slider/style.scss":
/*!***************************************!*\
  !*** ./src/content-slider/style.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"content-slider/index": 0,
/******/ 			"content-slider/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkcontent_slider"] = globalThis["webpackChunkcontent_slider"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["content-slider/style-index"], () => (__webpack_require__("./src/content-slider/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map