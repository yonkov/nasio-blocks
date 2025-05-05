<?php
/**
 * Custom icons for the Nasio Blocks plugin.
 *
 * @package Nasio Blocks
 * @link https://feathericons.com/
 * @since nasio blocks 0.0.1
 */

 /**
  * Exit if accessed directly
  */
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Woof Woof Woof!' );
}

function nasio_blocks_get_svg( $icon ) {

	$svg_icons = array(
		'calendar'     => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
		'clock'        => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
		'fallback-svg' => '<svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="#cdcdcd" class="fallback-svg" viewBox="0 0 512 384"><path d="M231.941 169.348a15.65 15.65 0 0 1-4.583 11.065c-2.934 2.934-6.913 4.582-11.063 4.582s-8.13-1.649-11.063-4.582a15.65 15.65 0 0 1-4.582-11.065c0-4.15 1.648-8.129 4.582-11.063a15.65 15.65 0 0 1 26.71 11.063zm-41.724-46.935c-5.532 0-10.839 2.198-14.752 6.11s-6.109 9.219-6.109 14.751v104.308a20.86 20.86 0 0 0 6.109 14.751 20.87 20.87 0 0 0 14.752 6.111h125.17a20.86 20.86 0 0 0 20.862-20.862V143.274a20.86 20.86 0 0 0-20.862-20.861zm125.17 10.431a10.43 10.43 0 0 1 10.431 10.431v67.799l-39.397-20.308a5.21 5.21 0 0 0-6.019.97l-38.698 38.699-27.747-18.484a5.22 5.22 0 0 0-6.571.646l-27.599 24.554v-93.877a10.43 10.43 0 0 1 3.054-7.376c1.957-1.956 4.61-3.055 7.376-3.055z"/></svg>',
		'user'         => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
	);

	if ( array_key_exists( $icon, $svg_icons ) ) {
		$svg = trim( $svg_icons[ $icon ] ); // Add extra attributes to SVG code.
		$svg = preg_replace( "/([\n\t]+)/", ' ', $svg ); // Remove newlines & tabs.
		$svg = preg_replace( '/>\s*</', '><', $svg );    // Remove whitespace between SVG tags.
		return $svg;
	}
	return null;

}
