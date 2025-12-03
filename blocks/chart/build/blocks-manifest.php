<?php
// This file is generated. Do not modify it manually.
return array(
	'chart' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'version' => '1.0.3',
		'name' => 'nasio-block/chart',
		'title' => 'Chart',
		'category' => 'nasio-blocks',
		'icon' => 'chart-bar',
		'description' => 'Create beautiful charts with Chart.js - pie, doughnut, bar, and line charts.',
		'keywords' => array(
			'chart',
			'graph',
			'data',
			'visualization',
			'statistics'
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
			'chartType' => array(
				'type' => 'string',
				'default' => 'pie'
			),
			'chartData' => array(
				'type' => 'array',
				'default' => array(
					array(
						'label' => 'Item 1',
						'value' => 64
					),
					array(
						'label' => 'Item 2',
						'value' => 6
					),
					array(
						'label' => 'Item 3',
						'value' => 3.6
					),
					array(
						'label' => 'Item 4',
						'value' => 27.5
					)
				)
			),
			'chartDatasets' => array(
				'type' => 'array',
				'default' => array(
					array(
						'label' => 'Dataset 1',
						'data' => array(
							64,
							6,
							3.6,
							27.5
						)
					)
				)
			),
			'chartColors' => array(
				'type' => 'array',
				'default' => array(
					'#36A2EB',
					'#DC3545',
					'#FFCE56',
					'#4BC0C0',
					'#9966FF',
					'#FF9F40'
				)
			),
			'chartTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'showLegend' => array(
				'type' => 'boolean',
				'default' => true
			),
			'legendPosition' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'chartWidth' => array(
				'type' => 'number',
				'default' => 400
			),
			'chartHeight' => array(
				'type' => 'number',
				'default' => 300
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'borderColor' => array(
				'type' => 'string'
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'showDataLabels' => array(
				'type' => 'boolean',
				'default' => false
			),
			'dataUnit' => array(
				'type' => 'string',
				'default' => ''
			),
			'unitPosition' => array(
				'type' => 'string',
				'default' => 'after'
			),
			'labelThreshold' => array(
				'type' => 'number'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
