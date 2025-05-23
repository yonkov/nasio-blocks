<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$team_members = array(
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-01.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-02.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-03.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-04.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-05.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-06.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-07.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-08.jpg',
	NASIO_BLOCKS_URL . 'assets/img/testimonials/team-member-09.jpg',
);

$quotations = array(
	NASIO_BLOCKS_URL . 'assets/img/quotation.png',
	NASIO_BLOCKS_URL . 'assets/img/quotation-1.png',
	NASIO_BLOCKS_URL . 'assets/img/quotation-2.png',
	NASIO_BLOCKS_URL . 'assets/img/quotation-3.png',
);

$content = '<!-- wp:group {"align":"full","style":{"color":{"background":"#f8f8f8"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#f8f8f8"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"33%","style":{"spacing":{"padding":{"top":"var:preset|spacing|x-large","bottom":"var:preset|spacing|x-large","left":"var:preset|spacing|small","right":"var:preset|spacing|small"}}}} -->
<div class="wp-block-column" style="padding-top:var(--wp--preset--spacing--x-large);padding-right:var(--wp--preset--spacing--small);padding-bottom:var(--wp--preset--spacing--x-large);padding-left:var(--wp--preset--spacing--small);flex-basis:33%"><!-- wp:heading {"level":6,"style":{"elements":{"link":{"color":{"text":"#356df1"}}},"color":{"text":"#356df1"}}} -->
<h6 class="wp-block-heading has-text-color has-link-color" style="color:#356df1"><strong>OUR TESTIMONIALS</strong></h6>
<!-- /wp:heading -->

<!-- wp:heading {"style":{"spacing":{"padding":{"right":"0","left":"0"}}}} -->
<h2 class="wp-block-heading" style="padding-right:0;padding-left:0">Student Stories &amp; Successes</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Discover their journeys, achievements, and why they chose our platform.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
<div class="wp-block-buttons"><!-- wp:button {"width":75,"style":{"color":{"background":"#356df1"}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-75"><a class="wp-block-button__link has-background wp-element-button" style="background-color:#356df1">More reviews</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/content-slider {"slidesPerView":2,"showArrows":false,"slidesPerGroup":2} -->
<div class="wp-block-nasio-block-content-slider is-display-mode-carousel" style="--slides-per-view:2px;--space-between:20px" data-space-between="20" data-loop="true" data-mode="carousel" data-autoplay="false" data-autoplay-delay="3000" data-show-dots="true" data-show-arrows="false" data-draggable="true" data-slides-per-group="2" data-slides-per-view="2"><div class="nasio-content-slider swiper"><div class="swiper-wrapper"><!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"overlayColor":"white","isUserOverlayColor":true,"minHeight":400,"minHeightUnit":"px","isDark":false,"style":{"elements":{"link":{"color":{"text":"var:preset|color|text-primary"}}},"spacing":{"padding":{"right":"0","left":"0","top":"0","bottom":"0"}}},"textColor":"text-primary"} -->
<div class="wp-block-cover is-light has-text-primary-color has-text-color has-link-color" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-white-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small","top":"var:preset|spacing|small","bottom":"var:preset|spacing|small"}},"border":{"radius":"10px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-radius:10px;padding-top:var(--wp--preset--spacing--small);padding-right:var(--wp--preset--spacing--small);padding-bottom:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"id":2475,"width":"32px","height":"auto","sizeSlug":"full","linkDestination":"none","align":"center","className":"is-resized"} -->
<figure class="wp-block-image aligncenter size-full is-resized"><img src="' . esc_url( $quotations[0] ) . '" alt="" class="wp-image-2475" style="width:32px;height:auto"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>This platform truly transformed how I learn! The courses are engaging and the support is fantastic. Highly recommended for growth.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small"}}}} -->
<div class="wp-block-columns" style="padding-top:var(--wp--preset--spacing--small)"><!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:image {"id":2365,"width":"80px","height":"80px","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"50px"},"color":{"duotone":"unset"}}} -->
<figure class="wp-block-image size-large is-resized has-custom-border"><img src="' . esc_url( $team_members[0] ) . '" alt="" class="wp-image-2365" style="border-radius:50px;object-fit:cover;width:80px;height:80px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:heading {"textAlign":"left","style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"textColor":"text-secondary","fontSize":"medium"} -->
<h2 class="wp-block-heading has-text-align-left has-text-secondary-color has-text-color has-medium-font-size" style="font-style:normal;font-weight:700">Elise Jensen</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left","style":{"color":{"text":"#646363"}},"fontSize":"small"} -->
<p class="has-text-align-left has-text-color has-small-font-size" style="color:#646363">Project Coordinator</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide -->

<!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"overlayColor":"white","isUserOverlayColor":true,"minHeight":400,"minHeightUnit":"px","isDark":false,"style":{"elements":{"link":{"color":{"text":"var:preset|color|text-primary"}}},"spacing":{"padding":{"right":"0","left":"0","top":"0","bottom":"0"}}},"textColor":"text-primary"} -->
<div class="wp-block-cover is-light has-text-primary-color has-text-color has-link-color" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-white-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|small","left":"var:preset|spacing|small","top":"var:preset|spacing|small","bottom":"var:preset|spacing|small"}},"border":{"radius":"10px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-radius:10px;padding-top:var(--wp--preset--spacing--small);padding-right:var(--wp--preset--spacing--small);padding-bottom:var(--wp--preset--spacing--small);padding-left:var(--wp--preset--spacing--small)"><!-- wp:image {"id":2474,"width":"32px","height":"auto","sizeSlug":"full","linkDestination":"none","align":"center","className":"is-resized"} -->
<figure class="wp-block-image aligncenter size-full is-resized"><img src="' . esc_url( $quotations[1] ) . '" alt="" class="wp-image-2474" style="width:32px;height:auto"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>I achieved my learning goals thanks to these amazing courses! The interface is so easy to use. A good experience overall.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"padding":{"top":"var:preset|spacing|small"}}}} -->
<div class="wp-block-columns" style="padding-top:var(--wp--preset--spacing--small)"><!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:image {"id":2367,"width":"80px","height":"80px","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"50px"},"color":{"duotone":"unset"}}} -->
<figure class="wp-block-image size-large is-resized has-custom-border"><img src="' . esc_url( $team_members[1] ) . '" alt="" class="wp-image-2367" style="border-radius:50px;object-fit:cover;width:80px;height:80px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:heading {"textAlign":"left","style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"textColor":"text-secondary","fontSize":"medium"} -->
<h2 class="wp-block-heading has-text-align-left has-text-secondary-color has-text-color has-medium-font-size" style="font-style:normal;font-weight:700">Daniella Teodor</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"left","style":{"color":{"text":"#646363"}},"fontSize":"small"} -->
<p class="has-text-align-left has-text-color has-small-font-size" style="color:#646363">Digital Marketing</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide -->

<!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"overlayColor":"white","isUserOverlayColor":true,"minHeight":400,"minHeightUnit":"px","isDark":false} -->
<div class="wp-block-cover is-light" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-white-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":2350,"width":"32px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
<figure class="wp-block-image aligncenter size-full is-resized"><img src="' . esc_url( $quotations[2] ) . '" alt="" class="wp-image-2350" style="width:32px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<p class="has-black-color has-text-color has-link-color">I was new to online course creation, but this made it so simple! My students love the lessons. So happy I chose this platform!</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:image {"id":2371,"width":"80px","height":"80px","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"50px"}}} -->
<figure class="wp-block-image size-large is-resized has-custom-border"><img src="' . esc_url( $team_members[2] ) . '" alt="" class="wp-image-2371" style="border-radius:50px;object-fit:cover;width:80px;height:80px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:heading {"level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<h3 class="wp-block-heading has-black-color has-text-color has-link-color">Anja Holm</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|text-secondary"}}}},"textColor":"text-secondary","fontSize":"small"} -->
<p class="has-text-secondary-color has-text-color has-link-color has-small-font-size">Online language tutor</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide -->

<!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"overlayColor":"white","isUserOverlayColor":true,"minHeight":400,"minHeightUnit":"px","isDark":false} -->
<div class="wp-block-cover is-light" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-white-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":2352,"width":"32px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
<figure class="wp-block-image aligncenter size-full is-resized"><img src="' . esc_url( $quotations[3] ) . '" alt="" class="wp-image-2352" style="width:32px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<p class="has-black-color has-text-color has-link-color">The visual builder is a dream! My courses look so professional now, and it was surprisingly easy. My confidence is way up! Thanks alot. </p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:image {"id":2369,"width":"80px","height":"80px","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"50px"}}} -->
<figure class="wp-block-image size-large is-resized has-custom-border"><img src="' . esc_url( $team_members[3] ) . '" alt="" class="wp-image-2369" style="border-radius:50px;object-fit:cover;width:80px;height:80px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:heading {"level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<h3 class="wp-block-heading has-black-color has-text-color has-link-color">Clara Anderson</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|text-secondary"}}}},"textColor":"text-secondary","fontSize":"small"} -->
<p class="has-text-secondary-color has-text-color has-link-color has-small-font-size">Online Skills Coach</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide -->

<!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"overlayColor":"white","isUserOverlayColor":true,"minHeight":400,"minHeightUnit":"px","isDark":false} -->
<div class="wp-block-cover is-light" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-white-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":2100,"width":"32px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
<figure class="wp-block-image aligncenter size-full is-resized"><img src="' . esc_url( $quotations[0] ) . '" alt="" class="wp-image-2100" style="width:32px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<p class="has-black-color has-text-color has-link-color">I can finally share my passion with so many people! This platform gave me the tools &amp; confidence to launch. So rewarding!</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:image {"id":2376,"width":"80px","height":"80px","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"50px"}}} -->
<figure class="wp-block-image size-large is-resized has-custom-border"><img src="' . esc_url( $team_members[4] ) . '" alt="" class="wp-image-2376" style="border-radius:50px;object-fit:cover;width:80px;height:80px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:heading {"level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<h3 class="wp-block-heading has-black-color has-text-color has-link-color">Olivia Chen</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|text-secondary"}}}},"textColor":"text-secondary","fontSize":"small"} -->
<p class="has-text-secondary-color has-text-color has-link-color has-small-font-size">Fitness Coach</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide -->

<!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"overlayColor":"white","isUserOverlayColor":true,"minHeight":400,"minHeightUnit":"px","isDark":false} -->
<div class="wp-block-cover is-light" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-white-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":2101,"width":"32px","sizeSlug":"full","linkDestination":"none","align":"center"} -->
<figure class="wp-block-image aligncenter size-full is-resized"><img src="' . esc_url( $quotations[1] ) . '" alt="" class="wp-image-2101" style="width:32px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<p class="has-black-color has-text-color has-link-color">My students are loving the new interactive lessons! It\'s amazing to see their engagement skyrocket. This platform is really a gem!</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:image {"id":2378,"width":"80px","height":"80px","scale":"cover","sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"50px"}}} -->
<figure class="wp-block-image size-large is-resized has-custom-border"><img src="' . esc_url( $team_members[5] ) . '" alt="" class="wp-image-2378" style="border-radius:50px;object-fit:cover;width:80px;height:80px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:heading {"level":3,"style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}},"textColor":"black"} -->
<h3 class="wp-block-heading has-black-color has-text-color has-link-color">Dr. Sofia Rossi</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|text-secondary"}}}},"textColor":"text-secondary","fontSize":"small"} -->
<p class="has-text-secondary-color has-text-color has-link-color has-small-font-size">University Lecturer</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide --></div><div class="swiper-pagination"></div></div></div>
<!-- /wp:nasio-block/content-slider --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
';

return array(
	'title'      => __( 'Testimonials Slider', 'nasio-blocks' ),
	'categories' => array( 'nasio-patterns' ),
	'content'    => $content,
);
