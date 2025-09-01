<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$due_date = date('Y-m-d', strtotime('+9 days'));

$content = '<!-- wp:group {"align":"wide","className":"nasio-pattern","style":{"spacing":{"blockGap":"2rem","padding":{"top":"1rem","bottom":"1rem"}}},"layout":{"type":"constrained","contentSize":"980px","wideSize":"1180px"}} -->
<div class="wp-block-group alignwide nasio-pattern" style="padding-top:1rem;padding-bottom:1rem"><!-- wp:heading {"textAlign":"center","align":"wide","style":{"typography":{"fontSize":"2rem"}}} -->
<h2 class="wp-block-heading alignwide has-text-align-center" style="font-size:2rem">Early Bird Sale</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1rem","fontWeight":"600","textTransform":"uppercase","letterSpacing":"0.1em","fontStyle":"normal"},"elements":{"link":{"color":{"text":"#3a72d4"}}},"color":{"text":"#3a72d4"}}} -->
<p class="has-text-align-center has-text-color has-link-color" style="color:#3a72d4;font-size:1rem;font-style:normal;font-weight:600;letter-spacing:0.1em;text-transform:uppercase">Sale ends in</p>
<!-- /wp:paragraph -->

<!-- wp:nasio-block/countdown {"targetDate":"' . $due_date . '","spacing":24,"fontWeight":"bold","unitBackgroundColor":"#ffffff","unitBorderRadius":5,"delimiter":":","className":"has-text-align-undefined","style":{"typography":{"fontSize":"26px"},"spacing":{"padding":{"top":"3rem","bottom":"3rem"},"margin":{"top":"2rem","bottom":"2rem"}},"color":{"background":"#ebeefc"}}} -->
<div class="wp-block-nasio-block-countdown has-text-align-center has-text-align-undefined has-background" data-target-date="' . $due_date . '" data-target-time="23:59" data-days-label="Days" data-hours-label="Hours" data-minutes-label="Minutes" data-seconds-label="Seconds" data-delimiter=":" data-unit-prefix="true" style="background-color:#ebeefc;margin-top:2rem;margin-bottom:2rem;padding-top:3rem;padding-bottom:3rem;font-size:26px;--countdown-spacing:24px;--countdown-delimiter:&quot;:&quot;;--countdown-unit-background-color:#ffffff;--countdown-unit-border-radius:5px;font-weight:bold"><div class="countdown-container"><div class="countdown-unit"><span class="countdown-number" data-unit="days">0</span><span class="countdown-label">Days</span></div><span class="countdown-delimiter">:</span><div class="countdown-unit"><span class="countdown-number" data-unit="hours">0</span><span class="countdown-label">Hours</span></div><span class="countdown-delimiter">:</span><div class="countdown-unit"><span class="countdown-number" data-unit="minutes">0</span><span class="countdown-label">Minutes</span></div><span class="countdown-delimiter">:</span><div class="countdown-unit"><span class="countdown-number" data-unit="seconds">0</span><span class="countdown-label">Seconds</span></div></div></div>
<!-- /wp:nasio-block/countdown -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"textAlign":"center","backgroundColor":"black"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-black-background-color has-background has-text-align-center wp-element-button">SHOP NOW</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->';

return array(
	'title'      => __( 'Countdown Sale', 'nasio-blocks' ),
	'categories' => array( 'nasio-patterns' ),
	'content'    => $content,
);
