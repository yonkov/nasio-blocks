/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	Spinner,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import ServerSideRender from "@wordpress/server-side-render";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @param  root0.className     The class name provided by the block editor
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, className }) {
	const {
		numberOfPosts,
		postCategory,
		showFeaturedImage,
		showFallbackImage,
		showExcerpt,
		showAuthor,
		showDate,
		slidesPerView,
		sliderHeight,
		spaceBetween,
		loop,
		displayMode,
		autoplay,
		autoplayDelay,
		showDots,
		showArrows,
		draggable,
		includeStickyPost,
		contentPosition,
	} = attributes;

	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const previewRef = useRef(null);
	const swiperInstanceRef = useRef(null);

	useEffect(() => {
		apiFetch({ path: "/wp/v2/categories" }).then((cats) => {
			const options = [
				{ label: __("All Categories", "nasio-blocks"), value: "" },
				...cats.map((category) => ({
					label: category.name,
					value: category.id.toString(),
				})),
			];
			setCategories(options);
			setIsLoading(false);
		});
	}, []);

	// Initialize Swiper handler function
	const initSwiper = () => {
		// Only run this after the preview has loaded and if Swiper is available
		if (!previewRef.current) {
			return;
		}

		// Check if Swiper is available in the window
		if (typeof window.Swiper === "undefined") {
			console.error("Swiper is not loaded in the editor");
			return;
		}

		// Find the slider container within our preview
		const swiperElement = previewRef.current.querySelector(
			".nasio-post-slider",
		);

		if (!swiperElement) {
			console.error("Swiper element not found in the DOM");
			return;
		}

		// Clean up any existing Swiper instance
		if (swiperInstanceRef.current) {
			swiperInstanceRef.current.destroy();
			swiperInstanceRef.current = null;
		}

		// Different settings based on mode
		const settings = {
			slidesPerView: displayMode === "carousel" ? parseInt(slidesPerView) : 1,
			sliderHeight: displayMode === "fullwidth" ? parseInt(sliderHeight) : 0,
			spaceBetween: displayMode === "carousel" ? parseInt(spaceBetween) : 0,
			slidesPerGroup: displayMode === "carousel" ? parseInt(slidesPerView) : 1,
			rewind: loop,
			observer: true,
			observeParents: true,
			allowTouchMove: draggable,
			simulateTouch: draggable,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			}
		};

		// If fullwidth mode, use different settings
		if (displayMode === "fullwidth") {
			settings.effect = "fade";
			settings.fadeEffect = {
				crossFade: true,
			};
			// For fullwidth we want regular loop rather than rewind
			settings.loop = loop;
			delete settings.rewind;
		}

		// Add autoplay if enabled
		if (autoplay) {
			settings.autoplay = {
				delay: autoplayDelay,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			};
		}

		// Add pagination if enabled
		if (showDots) {
			settings.pagination = {
				el: ".swiper-pagination",
				clickable: true,
			};
		}

		// Add navigation if enabled
		if (showArrows) {
			settings.navigation = {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			};
		}

		// Add responsive breakpoints for carousel mode
		if (displayMode === "carousel") {
			settings.slidesPerView = 1; // Default to 1 slide for smallest screens
			settings.slidesPerGroup = 1; // Default to 1 for smallest screens

			settings.breakpoints = {
				// Breakpoints use min-width (not max-width)
				// When window width is >= 480px
				480: {
					slidesPerView: Math.min(2, slidesPerView),
					slidesPerGroup: Math.min(2, slidesPerView),
				},
				// When window width is >= 768px
				768: {
					slidesPerView: parseInt(slidesPerView),
					slidesPerGroup: parseInt(slidesPerView),
				},
			};
		}

		try {
			// Initialize Swiper
			swiperInstanceRef.current = new window.Swiper(swiperElement, settings);

			// Force update after initialization to make sure everything is rendered correctly
			setTimeout(() => {
				if (swiperInstanceRef.current) {
					swiperInstanceRef.current.update();
				}
			}, 100);
		} catch (error) {
			console.error("Error initializing Swiper:", error);
		}
	};

	// Initialize Swiper in the editor
	useEffect(() => {
		if (!isLoading) {
			// Clean up previous Swiper instance if it exists
			if (swiperInstanceRef.current) {
				swiperInstanceRef.current.destroy();
				swiperInstanceRef.current = null;
			}

			// Initialize Swiper after a short delay to ensure DOM is ready
			const timer = setTimeout(() => {
				initSwiper();
			}, 1000); // Use longer timeout to ensure ServerSideRender has fully completed

			return () => {
				clearTimeout(timer);
				if (swiperInstanceRef.current) {
					swiperInstanceRef.current.destroy();
					swiperInstanceRef.current = null;
				}
			};
		}
	}, [isLoading, ...Object.values(attributes)]);

	const blockProps = useBlockProps({
		className: `wp-block-nasio-block-post-slider is-display-mode-${displayMode} is-editor-preview ${
			className || ""
		}`,
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={
						displayMode === "carousel"
							? __("Carousel Settings", "nasio-blocks")
							: __("Slider Settings", "nasio-blocks")
					}
				>
					<SelectControl
						label={__("Display Mode", "nasio-blocks")}
						value={displayMode}
						help={__(
							"Choose the post carousel if you want to display multiple columns. The fullwidth slider mode is perfect for fullwidth slides.",
							"nasio-blocks",
						)}
						options={[
							{ label: __("Carousel", "nasio-blocks"), value: "carousel" },
							{
								label: __("Fullwidth Slider", "nasio-blocks"),
								value: "fullwidth",
							},
						]}
						onChange={(value) => setAttributes({ displayMode: value })}
					/>
					{displayMode === "carousel" && (
						<>
							<RangeControl
								label={__("Slides Per View", "nasio-blocks")}
								value={slidesPerView}
								onChange={(value) => setAttributes({ slidesPerView: value })}
								min={1}
								max={5}
							/>
							<RangeControl
								label={__("Space Between Slides (px)", "nasio-blocks")}
								value={spaceBetween}
								onChange={(value) => setAttributes({ spaceBetween: value })}
								min={0}
								max={50}
							/>
						</>
					)}
					{displayMode === "fullwidth" && (
						<RangeControl
							label={__("Slider Overlay", "nasio-blocks")}
							value={attributes.imageOverlay || 2}
							onChange={(value) => setAttributes({ imageOverlay: value })}
							min={0}
							max={10}
							help={__(
								"Darkens the featured image. Default is 2. Higher values create a darker overlay.",
								"nasio-blocks",
							)}
						/>
					)}
					{displayMode === "fullwidth" && 
						<RangeControl
							label={__("Slider height (px)", "nasio-blocks")}
							value={sliderHeight}
							onChange={(value) => setAttributes({ sliderHeight: value })}
							min={250}
							max={1000}
						/> 
					}
					<ToggleControl
						label={__("Show Dots (Pagination)", "nasio-blocks")}
						checked={showDots}
						onChange={() => setAttributes({ showDots: !showDots })}
					/>
					<ToggleControl
						label={__("Show Arrows (Navigation)", "nasio-blocks")}
						checked={showArrows}
						onChange={() => setAttributes({ showArrows: !showArrows })}
					/>
					<ToggleControl
						label={__("Drag Slides", "nasio-blocks")}
						checked={draggable}
						onChange={() => setAttributes({ draggable: !draggable })}
					/>
					<ToggleControl
						label={
							displayMode === "carousel"
								? __("Loop Carousel", "nasio-blocks")
								: __("Loop Slider", "nasio-blocks")
						}
						checked={loop}
						onChange={() => setAttributes({ loop: !loop })}
					/>
					<ToggleControl
						label={__("Autoplay", "nasio-blocks")}
						checked={autoplay}
						onChange={() => setAttributes({ autoplay: !autoplay })}
					/>
					{autoplay && (
						<RangeControl
							label={__("Autoplay Delay (ms)", "nasio-blocks")}
							value={autoplayDelay}
							onChange={(value) => setAttributes({ autoplayDelay: value })}
							min={1000}
							max={10000}
							step={500}
						/>
					)}
				</PanelBody>

				<PanelBody title={__("Post Settings", "nasio-blocks")}>
					<RangeControl
						label={__("Number of Posts", "nasio-blocks")}
						value={numberOfPosts}
						onChange={(value) => setAttributes({ numberOfPosts: value })}
						min={1}
						max={20}
					/>
					{!isLoading && (
						<SelectControl
							label={__("Category", "nasio-blocks")}
							value={postCategory}
							options={categories}
							onChange={(value) => setAttributes({ postCategory: value })}
						/>
					)}
					{displayMode === "fullwidth" && (
						<SelectControl
							label={__("Content Position", "nasio-blocks")}
							value={contentPosition || "overlay-center"}
							options={[
								{
									label: __("Text Overlay (Top)", "nasio-blocks"),
									value: "overlay-top",
								},
								{
									label: __("Text Overlay (Center)", "nasio-blocks"),
									value: "overlay-center",
								},
								{
									label: __("Text Overlay (Bottom)", "nasio-blocks"),
									value: "overlay-bottom",
								},
							]}
							onChange={(value) => setAttributes({ contentPosition: value })}
							help={__(
								"Choose where to position the post content in the fullwidth slider. For this to work, you need to add featured images to the posts you want to display.",
								"nasio-blocks",
							)}
						/>
					)}
					<ToggleControl
						label={__("Show Featured Image", "nasio-blocks")}
						checked={showFeaturedImage}
						onChange={() =>
							setAttributes({ showFeaturedImage: !showFeaturedImage })
						}
					/>
					{showFeaturedImage && displayMode === "carousel" && (
						<ToggleControl
							label={__("Show Fallback Image", "nasio-blocks")}
							checked={showFallbackImage}
							onChange={() =>
								setAttributes({ showFallbackImage: !showFallbackImage })
							}
							help={__(
								"Show image placeholder when there is no featured image.",
								"nasio-blocks",
							)}
						/>
					)}
					<ToggleControl
						label={__("Show Excerpt", "nasio-blocks")}
						checked={showExcerpt}
						onChange={() => setAttributes({ showExcerpt: !showExcerpt })}
					/>
					<ToggleControl
						label={__("Show Author", "nasio-blocks")}
						checked={showAuthor}
						onChange={() => setAttributes({ showAuthor: !showAuthor })}
					/>
					<ToggleControl
						label={__("Show Date", "nasio-blocks")}
						checked={showDate}
						onChange={() => setAttributes({ showDate: !showDate })}
					/>
					<ToggleControl
						label={__("Include Sticky Post", "nasio-blocks")}
						checked={includeStickyPost}
						onChange={() =>
							setAttributes({ includeStickyPost: !includeStickyPost })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="nasio-post-slider-preview" ref={previewRef}>
				<h3 className="nasio-slider-editor-title">
					{displayMode === "carousel"
						? __("Post Carousel Preview", "nasio-blocks")
						: __("Fullwidth Slider Preview", "nasio-blocks")}
				</h3>
				{isLoading ? (
					<div className="loading-spinner">
						<Spinner />
						<p>{__("Loading categories...", "nasio-blocks")}</p>
					</div>
				) : (
					<ServerSideRender
						block="nasio-block/post-slider"
						attributes={attributes}
					/>
				)}
			</div>
		</div>
	);
}
