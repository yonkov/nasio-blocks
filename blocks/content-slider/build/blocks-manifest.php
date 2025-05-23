<?php
// This file is generated. Do not modify it manually.
return array(
	'content-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 2,
		'version' => '1.0.0.1',
		'name' => 'nasio-block/content-slider',
		'title' => 'Content Slider',
		'category' => 'nasio-blocks',
		'icon' => 'slides',
		'description' => 'Create a customizable slider with your own content blocks.',
		'keywords' => array(
			'slider',
			'carousel',
			'content',
			'slideshow'
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
			'slidesPerView' => array(
				'type' => 'number',
				'default' => 3
			),
			'spaceBetween' => array(
				'type' => 'number',
				'default' => 20
			),
			'displayMode' => array(
				'type' => 'string',
				'default' => 'carousel'
			),
			'effect' => array(
				'type' => 'string',
				'default' => 'slide'
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
			),
			'slidesPerGroup' => array(
				'type' => 'number',
				'default' => 3
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'slide' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 2,
		'name' => 'nasio-block/slide',
		'title' => 'Slide',
		'category' => 'nasio-blocks',
		'icon' => 'slides',
		'description' => 'Individual slide for the content slider.',
		'parent' => array(
			'nasio-block/content-slider'
		),
		'usesContext' => array(
			'nasio-block/displayMode'
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'nasio-blocks'
	)
);
