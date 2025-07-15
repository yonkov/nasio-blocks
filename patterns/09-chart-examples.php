<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = '<!-- wp:group {"align":"wide","layout":{"type":"constrained","contentSize":"980px","wideSize":"1180px"}} -->
<div class="wp-block-group alignwide"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Data Visualization</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"spacing":{"padding":{"left":"1.2rem","bottom":"1rem"}}}} -->
<p class="has-text-align-center" style="padding-bottom:1rem;padding-left:1.2rem">Showcase your data with beautiful, interactive charts.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"2em","left":"2em"}}}} -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/chart {"chartData":[{"label":"WordPress","value":62.8},{"label":"Shopify","value":6.1},{"label":"Wix","value":3.6},{"label":"Others","value":27.5}],"chartColors":["#36A2EB","#DC3545","#FFCE56","#4BC0C0"],"chartTitle":"CMS Market Share","chartWidth":440,"chartHeight":330,"backgroundColor":"#f5f5f5","showDataLabels":true,"dataUnit":"%","labelThreshold":5} -->
<div class="wp-block-nasio-block-chart chart-type-pie" data-chart-type="pie" data-chart-data="[{&quot;label&quot;:&quot;WordPress&quot;,&quot;value&quot;:62.8},{&quot;label&quot;:&quot;Shopify&quot;,&quot;value&quot;:6.1},{&quot;label&quot;:&quot;Wix&quot;,&quot;value&quot;:3.6},{&quot;label&quot;:&quot;Others&quot;,&quot;value&quot;:27.5}]" data-chart-datasets="[{&quot;label&quot;:&quot;Dataset 1&quot;,&quot;data&quot;:[64,6,3.6,27.5]}]" data-chart-colors="[&quot;#36A2EB&quot;,&quot;#DC3545&quot;,&quot;#FFCE56&quot;,&quot;#4BC0C0&quot;]" data-chart-title="CMS Market Share" data-show-legend="true" data-legend-position="top" data-chart-width="440" data-chart-height="330" data-background-color="#f5f5f5" data-border-color="" data-border-width="1" data-show-data-labels="true" data-data-unit="%" data-unit-position="after" data-label-threshold="5"><div class="chart-container" style="width:440px;height:330px;margin:0 auto;position:relative;background-color:#f5f5f5"><canvas class="nasio-chart-canvas"></canvas></div></div>
<!-- /wp:nasio-block/chart --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/chart {"chartType":"bar","chartData":[{"label":"Q1","value":8.3},{"label":"Q2","value":6.7},{"label":"Q3","value":5.9},{"label":"Q4","value":5.9}],"chartDatasets":[{"label":"Revenues 2023","data":[8.3,6.7,5.9,6.1]},{"label":"Revenues 2024","data":[7.2,13.5,18.1,22.1]}],"chartColors":["#36a2eb","#FF6384"],"chartTitle":"Nvidia\'s Quarterly Revenues (USD)","legendPosition":"bottom","chartWidth":440,"chartHeight":330,"backgroundColor":"#f5f5f5","dataUnit":"B"} -->
<div class="wp-block-nasio-block-chart chart-type-bar" data-chart-type="bar" data-chart-data="[{&quot;label&quot;:&quot;Q1&quot;,&quot;value&quot;:8.3},{&quot;label&quot;:&quot;Q2&quot;,&quot;value&quot;:6.7},{&quot;label&quot;:&quot;Q3&quot;,&quot;value&quot;:5.9},{&quot;label&quot;:&quot;Q4&quot;,&quot;value&quot;:5.9}]" data-chart-datasets="[{&quot;label&quot;:&quot;Revenues 2023&quot;,&quot;data&quot;:[8.3,6.7,5.9,6.1]},{&quot;label&quot;:&quot;Revenues 2024&quot;,&quot;data&quot;:[7.2,13.5,18.1,22.1]}]" data-chart-colors="[&quot;#36a2eb&quot;,&quot;#FF6384&quot;]" data-chart-title="Nvidia\'s Quarterly Revenues (USD)" data-show-legend="true" data-legend-position="bottom" data-chart-width="440" data-chart-height="330" data-background-color="#f5f5f5" data-border-color="" data-border-width="1" data-show-data-labels="false" data-data-unit="B" data-unit-position="after" data-label-threshold=""><div class="chart-container" style="width:440px;height:330px;margin:0 auto;position:relative;background-color:#f5f5f5"><canvas class="nasio-chart-canvas"></canvas></div></div>
<!-- /wp:nasio-block/chart --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"2em","left":"2em"},"margin":{"top":"2em"}}}} -->
<div class="wp-block-columns" style="margin-top:2em"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/chart {"chartType":"line","chartData":[{"label":"Jan","value":245},{"label":"Feb","value":238},{"label":"Mar","value":252},{"label":"Apr","value":241},{"label":"May","value":233},{"label":"Jun","value":226}],"chartDatasets":[{"label":"Questions 2024","data":[245,238,252,241,233,226]},{"label":"Questions 2025","data":[189,195,201,187,179,172]}],"chartColors":["#FF6B35","#36A2EB"],"chartTitle":"StackOverflow Questions Asked","chartWidth":440,"chartHeight":330,"backgroundColor":"#f5f5f5","dataUnit":"K"} -->
<div class="wp-block-nasio-block-chart chart-type-line" data-chart-type="line" data-chart-data="[{&quot;label&quot;:&quot;Jan&quot;,&quot;value&quot;:245},{&quot;label&quot;:&quot;Feb&quot;,&quot;value&quot;:238},{&quot;label&quot;:&quot;Mar&quot;,&quot;value&quot;:252},{&quot;label&quot;:&quot;Apr&quot;,&quot;value&quot;:241},{&quot;label&quot;:&quot;May&quot;,&quot;value&quot;:233},{&quot;label&quot;:&quot;Jun&quot;,&quot;value&quot;:226}]" data-chart-datasets="[{&quot;label&quot;:&quot;Questions 2024&quot;,&quot;data&quot;:[245,238,252,241,233,226]},{&quot;label&quot;:&quot;Questions 2025&quot;,&quot;data&quot;:[189,195,201,187,179,172]}]" data-chart-colors="[&quot;#FF6B35&quot;,&quot;#36A2EB&quot;]" data-chart-title="StackOverflow Questions Asked" data-show-legend="true" data-legend-position="top" data-chart-width="440" data-chart-height="330" data-background-color="#f5f5f5" data-border-color="" data-border-width="1" data-show-data-labels="false" data-data-unit="K" data-unit-position="after" data-label-threshold=""><div class="chart-container" style="width:440px;height:330px;margin:0 auto;position:relative;background-color:#f5f5f5"><canvas class="nasio-chart-canvas"></canvas></div></div>
<!-- /wp:nasio-block/chart --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/chart {"chartType":"doughnut","chartData":[{"label":"Motorola Moto G Power","value":149},{"label":"Samsung Galaxy A54 5G","value":449},{"label":"Google Pixel 8","value":699},{"label":"iPhone 15 Pro","value":999}],"chartColors":["#4BC0C0","#FF6384","#36A2EB","#9966FF"],"chartTitle":"Smartphone Price Comparison","chartWidth":440,"chartHeight":330,"backgroundColor":"#f5f5f5","showDataLabels":true,"dataUnit":"$","unitPosition":"before"} -->
<div class="wp-block-nasio-block-chart chart-type-doughnut" data-chart-type="doughnut" data-chart-data="[{&quot;label&quot;:&quot;Motorola Moto G Power&quot;,&quot;value&quot;:149},{&quot;label&quot;:&quot;Samsung Galaxy A54 5G&quot;,&quot;value&quot;:449},{&quot;label&quot;:&quot;Google Pixel 8&quot;,&quot;value&quot;:699},{&quot;label&quot;:&quot;iPhone 15 Pro&quot;,&quot;value&quot;:999}]" data-chart-datasets="[{&quot;label&quot;:&quot;Dataset 1&quot;,&quot;data&quot;:[64,6,3.6,27.5]}]" data-chart-colors="[&quot;#4BC0C0&quot;,&quot;#FF6384&quot;,&quot;#36A2EB&quot;,&quot;#9966FF&quot;]" data-chart-title="Smartphone Price Comparison" data-show-legend="true" data-legend-position="top" data-chart-width="440" data-chart-height="330" data-background-color="#f5f5f5" data-border-color="" data-border-width="1" data-show-data-labels="true" data-data-unit="$" data-unit-position="before" data-label-threshold=""><div class="chart-container" style="width:440px;height:330px;margin:0 auto;position:relative;background-color:#f5f5f5"><canvas class="nasio-chart-canvas"></canvas></div></div>
<!-- /wp:nasio-block/chart --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->';

return array(
	'title'      => __( 'Chart Examples', 'nasio-blocks' ),
	'categories' => array( 'nasio-patterns' ),
	'keywords'   => array( 'chart', 'graph', 'data', 'statistics' ),
	'content'    => $content
);
