<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$images = array(
	NASIO_BLOCKS_URL . 'assets/img/courses/course-1.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-2.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-3.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-4.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-5.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-6.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-7.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-8.jpg',
	NASIO_BLOCKS_URL . 'assets/img/courses/course-9.jpg',
);

$content= '<!-- wp:group {"align":"full","layout":{"type":"constrained","contentSize":"980px","wideSize":"1180px"}} -->
<div class="wp-block-group alignfull nasio-pattern nasio-pattern-tabs has-white-background-color has-background"><!-- wp:spacer {"height":"32px"} -->
<div style="height:32px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"className":"p-animation-text-moveUp","layout":{"type":"constrained"}} -->
<div class="wp-block-group p-animation-text-moveUp"><!-- wp:heading {"textAlign":"center","level":3,"className":"wp-block-heading","style":{"typography":{"fontSize":"1rem"},"elements":{"link":{"color":{"text":"var:preset|color|text-primary"}}}},"textColor":"text-primary"} -->
<h3 class="wp-block-heading has-text-align-center has-text-primary-color has-text-color has-link-color" style="font-size:1rem">Master Your Niche</h3>
<!-- /wp:heading -->

<!-- wp:heading {"textAlign":"center","className":"wp-block-heading ","style":{"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}},"elements":{"link":{"color":{"text":"var:preset|color|text-primary"}}}},"textColor":"text-primary","fontSize":"large"} -->
<h2 class="wp-block-heading has-text-align-center has-text-primary-color has-text-color has-link-color has-large-font-size" style="padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)">Specializations Tailored for You</h2>
<!-- /wp:heading -->

<!-- wp:spacer {"height":"0.5rem"} -->
<div style="height:0.5rem" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->

<!-- wp:nasio-block/tabs {"defaultActiveTab":"957379b0-e441-4d95-9967-e1099bc08e16","activeTabId":"0ea92a70-26ed-4c5c-9212-bcd1248e8816","tabHeaderActiveBackgroundColor":"#404040"} -->
<div class="wp-block-nasio-block-tabs nasio-tabs" data-default-active="957379b0-e441-4d95-9967-e1099bc08e16" style="--tabs-bg-color:#f7f7f7;--tabs-text-color:inherit;--tabs-active-bg-color:#404040;--tabs-active-text-color:#ffffff"><!-- wp:nasio-block/tab {"title":"Tab 1","blockId":"957379b0-e441-4d95-9967-e1099bc08e16"} -->
<div class="wp-block-nasio-block-tab nasio-tab" data-block-id="957379b0-e441-4d95-9967-e1099bc08e16"><div class="nasio-tab-header"><h3 class="nasio-tab-title">Tab 1</h3></div><div class="nasio-tab-content"><div class="nasio-tab-content-inner"><!-- wp:spacer {"height":"1rem"} -->
<div style="height:1rem" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"className":"p-animation-move-sideways","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|large","left":"var:preset|spacing|large"}}}} -->
<div class="wp-block-columns p-animation-move-sideways"><!-- wp:column {"style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2475,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom","className":"is-resized"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[0] ) . '" alt="" class="wp-image-2475" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">Free</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">Web development</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Kenny White</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">6 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"","style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2228,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom","className":"is-resized"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[1] ) . '" alt="" class="wp-image-2228" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">$ 250</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">Data Analysis</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Jamie Walt</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">33 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2476,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom","className":"is-resized"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[2] ) . '" alt="" class="wp-image-2476" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"},"border":{"radius":{"bottomLeft":"5px","bottomRight":"5px"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-bottom-left-radius:5px;border-bottom-right-radius:5px;background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">$ 170</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">Marketing Automation</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">John Smith</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">14 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph {"placeholder":"Add tab content here..."} -->
<p></p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:nasio-block/tab -->

<!-- wp:nasio-block/tab {"title":"Tab 2","blockId":"b8e2ac77-e9ca-431f-ae94-d1a3cd9819e4"} -->
<div class="wp-block-nasio-block-tab nasio-tab" data-block-id="b8e2ac77-e9ca-431f-ae94-d1a3cd9819e4"><div class="nasio-tab-header"><h3 class="nasio-tab-title">Tab 2</h3></div><div class="nasio-tab-content"><div class="nasio-tab-content-inner"><!-- wp:spacer {"height":"1rem"} -->
<div style="height:1rem" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --><!-- wp:columns {"className":"p-animation-move-sideways","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|medium","left":"var:preset|spacing|medium"}}}} -->
<div class="wp-block-columns p-animation-move-sideways"><!-- wp:column {"style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2724,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[3] ) . '" alt="" class="wp-image-2724" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">Free</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">Introduction to WordPress</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Kenny White</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">6 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"","style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2726,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[4] ) . '" alt="" class="wp-image-2726" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">$ 250</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><a href="#">Vibe Coding with ChatGPT</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Kenny White</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">33 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2732,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[5] ) . '" alt="" class="wp-image-2732" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"},"border":{"radius":{"bottomLeft":"5px","bottomRight":"5px"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-bottom-left-radius:5px;border-bottom-right-radius:5px;background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">$ 170</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">Google SEO Fundamentals</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Jon Spears</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">14 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph {"placeholder":"Add tab content here..."} -->
<p></p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:nasio-block/tab -->

<!-- wp:nasio-block/tab {"title":"Tab 3","blockId":"b502d97c-e527-4db2-af7c-c2ffd6069460"} -->
<div class="wp-block-nasio-block-tab nasio-tab" data-block-id="b502d97c-e527-4db2-af7c-c2ffd6069460"><div class="nasio-tab-header"><h3 class="nasio-tab-title">Tab 3</h3></div><div class="nasio-tab-content"><div class="nasio-tab-content-inner"><!-- wp:spacer {"height":"1rem"} -->
<div style="height:1rem" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"className":"p-animation-move-sideways","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|medium","left":"var:preset|spacing|medium"}}}} -->
<div class="wp-block-columns p-animation-move-sideways"><!-- wp:column {"style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2729,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[6] ) . '" alt="" class="wp-image-2729" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">$ 120</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">DSLR Photography: Shoot Like a Pro</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Kenny White</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">16 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"","style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2728,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[7] ) . '" alt="" class="wp-image-2728" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">$ 150</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">Python for Beginners: Learn Python for 30 Days</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Kenny White</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">16 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"color":{"background":"#f8f8f8"},"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column has-background" style="background-color:#f8f8f8;padding-right:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"lightbox":{"enabled":false},"id":2731,"width":"240px","aspectRatio":"3/2","scale":"cover","sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized"><a href="#"><img src="' . esc_url( $images[8] ) . '" alt="" class="wp-image-2731" style="aspect-ratio:3/2;object-fit:cover;width:240px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small","right":"0","bottom":"var:preset|spacing|small","left":"0"}},"color":{"background":"#f8f8f8"},"border":{"radius":{"bottomLeft":"5px","bottomRight":"5px"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-bottom-left-radius:5px;border-bottom-right-radius:5px;background-color:#f8f8f8;padding-top:var(--wp--preset--spacing--small);padding-right:0;padding-bottom:var(--wp--preset--spacing--small);padding-left:0"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1">$ 70</h6>
<!-- /wp:heading -->

<!-- wp:heading {"level":3,"className":"wp-block-heading"} -->
<h3 class="wp-block-heading"><a href="#">Mastering Focus and Productivity</a></h3>
<!-- /wp:heading -->

<!-- wp:columns {"verticalAlignment":"center"} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"var:preset|color|cyan-bluish-gray"}}}},"textColor":"cyan-bluish-gray"} -->
<h6 class="wp-block-heading has-cyan-bluish-gray-color has-text-color has-link-color">Kenny White</h6>
<!-- /wp:heading --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center"><!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size">7 Lessons</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"blue","textColor":"white","width":100,"className":"p-btn-animation-hover-arrow","style":{"spacing":{"padding":{"left":"0","right":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100 p-btn-animation-hover-arrow"><a class="wp-block-button__link has-white-color has-blue-background-color has-text-color has-background has-link-color wp-element-button" href="#" style="padding-right:0;padding-left:0">Start learning</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph {"placeholder":"Add tab content here..."} -->
<p></p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:nasio-block/tab --></div>
<!-- /wp:nasio-block/tabs --></div>
<!-- /wp:group -->';

return array(
	'title'      => __( 'Courses', 'nasio-blocks' ),
	'categories' => array( 'nasio-patterns' ),
	'content'    => $content,
);