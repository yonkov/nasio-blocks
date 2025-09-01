<?php
// This file is generated. Do not modify it manually.
return array(
	'countdown' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'version' => '1.0.0',
		'name' => 'nasio-block/countdown',
		'title' => 'Countdown',
		'category' => 'nasio-blocks',
		'icon' => 'clock',
		'description' => 'Display a countdown timer to a specific date and time.',
		'keywords' => array(
			'countdown',
			'timer',
			'date',
			'time'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'left',
				'center',
				'right',
				'wide',
				'full'
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => false,
				'fontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			)
		),
		'textdomain' => 'nasio-blocks',
		'attributes' => array(
			'targetDate' => array(
				'type' => 'string',
				'default' => ''
			),
			'targetTime' => array(
				'type' => 'string',
				'default' => '23:59'
			),
			'daysLabel' => array(
				'type' => 'string',
				'default' => 'Days'
			),
			'hoursLabel' => array(
				'type' => 'string',
				'default' => 'Hours'
			),
			'minutesLabel' => array(
				'type' => 'string',
				'default' => 'Minutes'
			),
			'secondsLabel' => array(
				'type' => 'string',
				'default' => 'Seconds'
			),
			'spacing' => array(
				'type' => 'number',
				'default' => 20
			),
			'textAlign' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'fontWeight' => array(
				'type' => 'string',
				'default' => 'normal'
			),
			'unitBackgroundColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'unitBorderColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'unitBorderWidth' => array(
				'type' => 'number',
				'default' => 0
			),
			'unitBorderRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'delimiter' => array(
				'type' => 'string',
				'default' => ''
			),
			'unitPrefix' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
