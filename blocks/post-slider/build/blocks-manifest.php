<?php
// This file is generated. Do not modify it manually.
return array(
	'post-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'version' => '0.0.1',
		'name' => 'nasio-block/post-slider',
		'title' => 'Post Slider',
		'category' => 'nasio-blocks',
		'icon' => 'slides',
		'description' => 'Display carousel or fullwidth slider of your latest posts.',
		'keywords' => array(
			'slider',
			'carousel',
			'posts'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'nasio-blocks',
		'attributes' => array(
			'numberOfPosts' => array(
				'type' => 'number',
				'default' => 9
			),
			'postCategory' => array(
				'type' => 'string',
				'default' => ''
			),
			'includeStickyPost' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showFeaturedImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showFallbackImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showFallbackSvg' => array(
				'type' => 'boolean',
				'default' => true
			),
			'imageOverlay' => array(
				'type' => 'number',
				'default' => 0
			),
			'showExcerpt' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showAuthor' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDate' => array(
				'type' => 'boolean',
				'default' => true
			),
			'contentPosition' => array(
				'type' => 'string',
				'default' => 'overlay-center'
			),
			'displayMode' => array(
				'type' => 'string',
				'default' => 'carousel'
			),
			'slidesPerView' => array(
				'type' => 'number',
				'default' => 3
			),
			'sliderHeight' => array(
				'type' => 'number',
				'default' => 480
			),
			'spaceBetween' => array(
				'type' => 'number',
				'default' => 20
			),
			'loop' => array(
				'type' => 'boolean',
				'default' => true
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'autoplayDelay' => array(
				'type' => 'number',
				'default' => 3000
			),
			'showDots' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showArrows' => array(
				'type' => 'boolean',
				'default' => true
			),
			'draggable' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:../../render.php'
	)
);
