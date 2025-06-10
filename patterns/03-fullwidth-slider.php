<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$images = array(
	NASIO_BLOCKS_URL . 'assets/img/content-slider/01.jpg',
	NASIO_BLOCKS_URL . 'assets/img/content-slider/02.jpg',
	NASIO_BLOCKS_URL . 'assets/img/content-slider/03.jpg',
);

$content = '<!-- wp:nasio-block/content-slider {"displayMode":"fullwidth","align":"full"} -->
<div class="wp-block-nasio-block-content-slider alignfull is-display-mode-fullwidth" style="--space-between:20px;--swiper-navigation-sides-dynamic-offset:8px" data-space-between="20" data-loop="true" data-mode="fullwidth" data-autoplay="false" data-autoplay-delay="3000" data-show-dots="true" data-show-arrows="true" data-draggable="true"><div class="nasio-content-slider swiper"><div class="swiper-wrapper"><!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"url":"' . esc_url( $images[0] ) . '","id":2854,"alt":"Railway road during sunset","dimRatio":30,"customOverlayColor":"#7a797d","isUserOverlayColor":false,"minHeight":600} -->
<div class="wp-block-cover" style="min-height:600px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-30 has-background-dim" style="background-color:#7a797d"></span><img class="wp-block-cover__image-background wp-image-2854" alt="Railway road during sunset" src="' . esc_url( $images[0] ) . '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","placeholder":"Add slide title...","textColor":"white","fontSize":"x-large"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-x-large-font-size">Journey of Thousand Miles Begins with a Single Step</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"spacing":{"padding":{"top":"1rem","bottom":"1rem"}}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color has-link-color" style="padding-top:1rem;padding-bottom:1rem">Don\'t let the opportunity pass you by.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"white","textColor":"black","style":{"elements":{"link":{"color":{"text":"var:preset|color|black"}}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-black-color has-white-background-color has-text-color has-background has-link-color wp-element-button" href="#">Get Started</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide -->

<!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"url":"' . esc_url( $images[1] ) . '","id":2850,"alt":"A landscape view of the snow-capped Alps in the distance","dimRatio":30,"customOverlayColor":"#788485","isUserOverlayColor":true,"minHeight":600,"isDark":false} -->
<div class="wp-block-cover is-light" style="min-height:600px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-30 has-background-dim" style="background-color:#788485"></span><img class="wp-block-cover__image-background wp-image-2850" alt="A landscape view of the snow-capped Alps in the distance" src="' . esc_url( $images[1] ) . '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","placeholder":"Add slide title...","style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem"}}},"textColor":"white","fontSize":"x-large"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-x-large-font-size" style="padding-top:1rem;padding-bottom:1rem">Special 7 Days in the Alps</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color has-link-color">Discover serenity where the road curves through mountains wrapped in morning mist.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide -->

<!-- wp:nasio-block/slide -->
<div class="wp-block-nasio-block-slide nasio-slide swiper-slide"><div class="nasio-slide-inner"><!-- wp:cover {"url":"' . esc_url( $images[2] ) . '","id":2851,"alt":"A serene landscape depicting a misty forest setting at dawn or dusk","dimRatio":40,"customOverlayColor":"#788485","isUserOverlayColor":false,"minHeight":600,"isDark":false} -->
<div class="wp-block-cover is-light" style="min-height:600px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-40 has-background-dim" style="background-color:#788485"></span><img class="wp-block-cover__image-background wp-image-2851" alt="A serene landscape depicting a misty forest setting at dawn or dusk" src="' . esc_url( $images[2] ) . '" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","placeholder":"Add slide title...","style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem"}}},"textColor":"white","fontSize":"x-large"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-x-large-font-size" style="padding-top:1rem;padding-bottom:1rem">Your Next Adventure Awaits</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color has-link-color">Open your eyes for the beauties of the hidden world.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover --></div></div>
<!-- /wp:nasio-block/slide --></div><div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div></div>
<!-- /wp:nasio-block/content-slider -->';

return array(
	'title'      => __( 'Hero Slider', 'nasio-blocks' ),
	'categories' => array( 'nasio-patterns' ),
	'content'    => $content,
);
