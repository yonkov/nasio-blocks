<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = '<!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"2.5rem","left":"1.25rem"},"padding":{"top":"2rem","bottom":"2rem"}}}} -->
<div class="wp-block-columns" style="padding-top:2rem;padding-bottom:2rem"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/icon-block {"icon":"brush","iconSize":32,"textColor":"blue","itemsJustification":"left","style":{"elements":{"link":{"color":{"text":"var:preset|color|blue"}}}}} -->
<div class="wp-block-nasio-block-icon-block wp-block-nasio-block-icon has-blue-color has-text-color has-link-color" style="--icon-size:32px;--background-color:transparent;--text-color:var(--wp--preset--color--blue);--border-radius:0;--padding:0"><div class="nasio-icon-wrapper is-justified-left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h8v-1.5H4V20zM18.9 3.5c-.6-.6-1.5-.6-2.1 0l-7.2 7.2c-.4-.1-.7 0-1.1.1-.5.2-1.5.7-1.9 2.2-.4 1.7-.8 2.2-1.1 2.7-.1.1-.2.3-.3.4l-.6 1.1H6c2 0 3.4-.4 4.7-1.4.8-.6 1.2-1.4 1.3-2.3 0-.3 0-.5-.1-.7L19 5.7c.5-.6.5-1.6-.1-2.2zM9.7 14.7c-.7.5-1.5.8-2.4 1 .2-.5.5-1.2.8-2.3.2-.6.4-1 .8-1.1.5-.1 1 .1 1.3.3.2.2.3.5.2.8 0 .3-.1.9-.7 1.3z"></path></svg></div></div>
<!-- /wp:nasio-block/icon-block -->

<!-- wp:heading {"style":{"typography":{"fontSize":"1.25rem"}}} -->
<h2 class="wp-block-heading" style="font-size:1.25rem">Easily Customizable</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Tailor your website to your specific needs using Nasio Blocks plugin.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/icon-block {"iconSize":32,"textColor":"blue","itemsJustification":"left","style":{"elements":{"link":{"color":{"text":"var:preset|color|blue"}}}}} -->
<div class="wp-block-nasio-block-icon-block wp-block-nasio-block-icon has-blue-color has-text-color has-link-color" style="--icon-size:32px;--background-color:transparent;--text-color:var(--wp--preset--color--blue);--border-radius:0;--padding:0"><div class="nasio-icon-wrapper is-justified-left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"></path></svg></div></div>
<!-- /wp:nasio-block/icon-block -->

<!-- wp:heading {"style":{"typography":{"fontSize":"1.25rem"}}} -->
<h2 class="wp-block-heading" style="font-size:1.25rem">High Performance</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>No need for heavy page builders to slow you down. You stay in control.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:nasio-block/icon-block {"icon":"mobile","iconSize":32,"textColor":"blue","itemsJustification":"left","style":{"elements":{"link":{"color":{"text":"var:preset|color|blue"}}}}} -->
<div class="wp-block-nasio-block-icon-block wp-block-nasio-block-icon has-blue-color has-text-color has-link-color" style="--icon-size:32px;--background-color:transparent;--text-color:var(--wp--preset--color--blue);--border-radius:0;--padding:0"><div class="nasio-icon-wrapper is-justified-left"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"></path></svg></div></div>
<!-- /wp:nasio-block/icon-block -->

<!-- wp:heading {"style":{"typography":{"fontSize":"1.25rem"}}} -->
<h2 class="wp-block-heading" style="font-size:1.25rem">Responsive Design</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We have made sure all the blocks look great on every screen size.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->';

return array(
	'title'      => __( 'Features', 'nasio-blocks' ),
	'categories' => array( 'nasio-patterns' ),
	'content'    => $content,
);
