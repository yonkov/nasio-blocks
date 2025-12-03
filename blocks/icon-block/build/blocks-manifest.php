<?php
// This file is generated. Do not modify it manually.
return array(
	'icon-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'version' => '1.0.3',
		'name' => 'nasio-block/icon-block',
		'title' => 'Icon Block',
		'category' => 'nasio-blocks',
		'icon' => 'star-filled',
		'description' => 'Add an icon with customizable size and link options.',
		'keywords' => array(
			'icon',
			'symbol',
			'button'
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'color' => array(
				'background' => true,
				'text' => true,
				'gradients' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'typography' => array(
				'fontSize' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			)
		),
		'textdomain' => 'nasio-blocks',
		'attributes' => array(
			'iconType' => array(
				'type' => 'string',
				'default' => 'wordpress',
				'enum' => array(
					'wordpress',
					'custom'
				)
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'starFilled'
			),
			'customSvg' => array(
				'type' => 'string',
				'default' => ''
			),
			'iconSize' => array(
				'type' => 'number',
				'default' => 24
			),
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'linkTarget' => array(
				'type' => 'string',
				'default' => '_self'
			),
			'rel' => array(
				'type' => 'string',
				'default' => ''
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'textColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'borderRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'itemsJustification' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
