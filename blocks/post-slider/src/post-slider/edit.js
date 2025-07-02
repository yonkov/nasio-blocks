import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Spinner,
	__experimentalText as Text
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useBlockProps } from '@wordpress/block-editor';

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
		slidesPerGroup,
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
		imageOverlay,
		arrowOffset,
		arrowColor,
		arrowBackgroundColor,
		paginationActiveColor,
		paginationInactiveColor
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

	// Memoize the Swiper initialization handler
	const initSwiper = useCallback(() => {
		if (!previewRef.current) {
			return;
		}

		if (typeof window.Swiper === "undefined") {
			console.error("Swiper is not loaded in the editor");
			return;
		}

		const swiperElement = previewRef.current.querySelector(
			".nasio-post-slider",
		);

		// Clean up any existing Swiper instance
		if (swiperInstanceRef.current) {
			swiperInstanceRef.current.destroy();
			swiperInstanceRef.current = null;
		}

		const settings = {
			slidesPerView: displayMode === "carousel" ? parseInt(slidesPerView) : 1,
			sliderHeight: displayMode === "fullwidth" ? parseInt(sliderHeight) : 0,
			spaceBetween: displayMode === "carousel" ? parseInt(spaceBetween) : 0,
			slidesPerGroup: displayMode === "carousel" ? parseInt(slidesPerGroup) : 1,
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

		if (autoplay) {
			settings.autoplay = {
				delay: autoplayDelay,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			};
		}

		if (showDots) {
			settings.pagination = {
				el: ".swiper-pagination",
				clickable: true,
			};
		}

		if (showArrows) {
			settings.navigation = {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			};
		}

		if (displayMode === "carousel") {
			settings.slidesPerView = 1;
			settings.slidesPerGroup = 1;
			settings.breakpoints = {
				480: {
					slidesPerView: Math.min(2, slidesPerView),
					slidesPerGroup: Math.min(2, slidesPerGroup)
				},
				768: {
					slidesPerView: parseInt(slidesPerView),
					slidesPerGroup: parseInt(slidesPerGroup)
				},
			};
		}

		try {
			swiperInstanceRef.current = new window.Swiper(swiperElement, settings);
		} catch (error) {
			console.error("Error initializing Swiper:", error);
		}
	}, [
		displayMode,
		slidesPerView,
		slidesPerGroup,
		sliderHeight,
		spaceBetween,
		loop,
		autoplay,
		autoplayDelay,
		showDots,
		showArrows,
		draggable,
		arrowOffset
	]);
	// Initialize Swiper after the ServerSideRender completes
    useEffect(() => {
        if (!previewRef.current) return;
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if ('childList' !== mutation.type) continue;
                for (const node of mutation.addedNodes) {
                    if ('DIV' !== node.tagName || !node.classList.contains('ssr')) continue;
					setTimeout(() => {
						initSwiper();
					}, 500);
                    return;
                }
            }
        })
        observer.observe(previewRef.current, {
            childList: true,
            subtree: true,
        })
        return () => observer.disconnect();
    }, [initSwiper])

	const blockProps = useBlockProps({
		className: `wp-block-nasio-block-post-slider is-display-mode-${displayMode} is-editor-preview ${className || ""}`,
		style: {
			'--swiper-navigation-sides-dynamic-offset': `${arrowOffset}px`
		}
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
								help={__('The number of slides visible on the screen.', 'nasio-blocks')}
							/>
							<RangeControl
								label={__("Slides Per Group", "nasio-blocks")}
								value={slidesPerGroup}
								onChange={(value) => setAttributes({ slidesPerGroup: value })}
								min={1}
								max={5}
								help={__('The number of slides to advance.', 'nasio-blocks')}
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
							value={imageOverlay || 2}
							onChange={(value) => setAttributes({ imageOverlay: value })}
							min={1}
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
						label={__("Show Arrows (Navigation)", "nasio-blocks")}
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
							help={__(
								"Choose how to position the arrows relative to the slider. Negative values move the arrows outside the slider.",
								"nasio-blocks"
							)}
						/>
					)}
					<ToggleControl
						label={__("Show Dots (Pagination)", "nasio-blocks")}
						checked={showDots}
						onChange={() => setAttributes({ showDots: !showDots })}
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
					<>
						<ServerSideRender
							skipBlockSupportAttributes
							block="nasio-block/post-slider"
							attributes={attributes}
							className="ssr"
						/>
					</>
				)}
			</div>
		</div>
	);
}