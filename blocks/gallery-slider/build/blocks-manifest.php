<?php
// This file is generated. Do not modify it manually.
return array(
	'gallery-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 2,
		'version' => '1.0.5',
		'name' => 'nasio-block/gallery-slider',
		'title' => 'Gallery Slider',
		'category' => 'nasio-blocks',
		'icon' => 'images-alt2',
		'description' => 'Create a beautiful slider from your gallery images.',
		'keywords' => array(
			'slider',
			'gallery',
			'images',
			'slideshow'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			)
		),
		'textdomain' => 'nasio-blocks',
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'ids' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'slidesPerView' => array(
				'type' => 'number',
				'default' => 3
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
			),
			'showCaptions' => array(
				'type' => 'boolean',
				'default' => true
			),
			'linkTo' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'imageSizeSlug' => array(
				'type' => 'string',
				'default' => 'large'
			),
			'customImageWidth' => array(
				'type' => 'string',
				'default' => ''
			),
			'customImageHeight' => array(
				'type' => 'string',
				'default' => ''
			),
			'slidesPerGroup' => array(
				'type' => 'number',
				'default' => 1
			),
			'arrowOffset' => array(
				'type' => 'number',
				'default' => 8
			),
			'arrowColor' => array(
				'type' => 'string',
				'default' => '#333'
			),
			'arrowBackgroundColor' => array(
				'type' => 'string'
			),
			'paginationActiveColor' => array(
				'type' => 'string',
				'default' => '#333'
			),
			'paginationInactiveColor' => array(
				'type' => 'string',
				'default' => '#ccc'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
