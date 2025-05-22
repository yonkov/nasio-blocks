<?php
/**
 * Server-side rendering of the `nasio-block/post-slider` block.
 *
 * @package Nasio Blocks
 */

 if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function nasio_blocks_render_post_slider( $attributes, $content, $block ) {

	if ( isset( $block->context['query']['postId'] ) && ! $block->context['query']['postId'] ) {
		return '';
	}

	$display_mode    = isset( $attributes['displayMode'] ) ? $attributes['displayMode'] : 'carousel';
	$posts_per_page  = isset( $attributes['numberOfPosts'] ) ? $attributes['numberOfPosts'] : 6;
	$slides_per_view = ( $display_mode === 'carousel' ) ? intval( $attributes['slidesPerView'] ?? 3 ) : 1;
	$slider_height   = ( $display_mode === 'fullwidth' ) ? intval( $attributes['sliderHeight'] ?? 480 ) : 0;
	$space_between   = ( $display_mode === 'carousel' ) ? intval( $attributes['spaceBetween'] ?? 20 ) : 0;
	$loop            = ! empty( $attributes['loop'] ) ? 'true' : 'false';
	$autoplay        = ! empty( $attributes['autoplay'] ) ? 'true' : 'false';
	$autoplay_delay  = intval( $attributes['autoplayDelay'] ?? 3000 );
	$show_dots       = ! empty( $attributes['showDots'] ) ? 'true' : 'false';
	$show_arrows     = ! empty( $attributes['showArrows'] ) ? 'true' : 'false';
	$draggable       = ! empty( $attributes['draggable'] ) ? 'true' : 'false';
	$slides_per_group = ( $display_mode === 'carousel' ) ? intval( $attributes['slidesPerGroup'] ?? 3 ) : 1;

	$show_featured_image = $attributes['showFeaturedImage'] ?? true;
	$show_fallback_image = $attributes['showFallbackImage'] && $attributes['showFeaturedImage'] ?? true;
	$show_excerpt        = $attributes['showExcerpt'] ?? true;
	$show_author         = $attributes['showAuthor'] ?? true;
	$show_date           = $attributes['showDate'] ?? true;

	$regular_posts = array();

	// First get regular posts
	$query_args = array(
		'post_type'      => 'post',
		'posts_per_page' => $posts_per_page,
		'post_status'    => 'publish',
		'order'          => 'desc',
		'orderby'        => 'date',
		'no_found_rows'  => true,
	);

	if ( isset( $attributes['postCategory'] ) && ! empty( $attributes['postCategory'] ) ) {
		$query_args['cat'] = intval( $attributes['postCategory'] );
	}

	$include_sticky = ! empty( $attributes['includeStickyPost'] );
	$sticky_posts   = $include_sticky ? get_option( 'sticky_posts' ) : array();
	
	$query_args = array(
		'post_type'           => 'post',
		'posts_per_page'      => -1, // Get all, limit later in PHP
		'post_status'         => 'publish',
		'orderby'             => 'date',
		'order'               => 'desc',
		'ignore_sticky_posts' => 1, // Prevent WP from pinning sticky posts automatically
		'no_found_rows'       => true,
	);
	
	if ( isset( $attributes['postCategory'] ) && ! empty( $attributes['postCategory'] ) ) {
		$query_args['cat'] = intval( $attributes['postCategory'] );
	}
	
	$all_posts = get_posts( $query_args );
	
	$sticky_posts_data = array();
	$non_sticky_posts  = array();
	
	foreach ( $all_posts as $post ) {
		if ( in_array( $post->ID, $sticky_posts, true ) ) {
			$sticky_posts_data[] = $post;
		} else {
			$non_sticky_posts[] = $post;
		}
	}
	
	$posts = $include_sticky
		? array_merge( $sticky_posts_data, $non_sticky_posts )
		: $non_sticky_posts;
	
	// Limit to desired total count
	$posts = array_slice( $posts, 0, $posts_per_page );
	
	if ( ! is_array( $posts ) ) {
		$posts = array();
	}

	if ( empty( $posts ) ) {
		return '<p>' . __( 'No posts found.', 'nasio-blocks' ) . '</p>';
	}

	$is_editor = function_exists( 'get_current_screen' ) && get_current_screen() && get_current_screen()->is_block_editor();

	$align_class   = isset( $attributes['align'] ) ? ' align' . $attributes['align'] : '';
	$wrapper_class = 'wp-block-nasio-block-post-slider is-display-mode-' . $display_mode . $align_class;

	if ( isset( $block->attributes['className'] ) ) {
		$wrapper_class .= ' ' . $block->attributes['className'];
	}

	if ( $display_mode === 'fullwidth' && isset( $attributes['contentPosition'] ) ) {
		$wrapper_class .= ' content-position-' . $attributes['contentPosition'];
	}

	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-overlay' ) !== false ) {
		$wrapper_class .= ' has-overlay-class-in-attributes';
	}

	if ( strpos( $wrapper_class, 'is-style-overlay' ) !== false ) {
		$wrapper_class .= ' has-overlay-class-in-wrapper';
	}

	if ( $is_editor ) {
		$wrapper_class .= ' is-editor-preview';
	}

	$slider_class = 'nasio-post-slider swiper' . ' has-' . $slides_per_view . '-columns';

	$data_attributes  = ' data-slides-per-view="' . esc_attr( $slides_per_view ) . '"';
	$data_attributes .= ' data-space-between="' . esc_attr( $space_between ) . '"';
	$data_attributes .= ' data-loop="' . esc_attr( $loop ) . '"';
	$data_attributes .= ' data-mode="' . esc_attr( $display_mode ) . '"';
	$data_attributes .= ' data-autoplay="' . esc_attr( $autoplay ) . '"';
	$data_attributes .= ' data-autoplay-delay="' . esc_attr( $autoplay_delay ) . '"';
	$data_attributes .= ' data-show-dots="' . esc_attr( $show_dots ) . '"';
	$data_attributes .= ' data-show-arrows="' . esc_attr( $show_arrows ) . '"';
	$data_attributes .= ' data-draggable="' . esc_attr( $draggable ) . '"';

	if ( $display_mode === 'carousel' ) {
		$data_attributes .= ' data-slides-per-group="' . esc_attr( $slides_per_group ) . '"'; // Corrected line
	}

	$style_attributes = ' style="'
	. '--slides-per-view:' . esc_attr( $slides_per_view ) . ';'
	. ( $slider_height > 0 ? '--slider-height:' . esc_attr( $slider_height ) . 'px;' : '' )
	. '--space-between:' . esc_attr( $space_between ) . 'px;'
	. '--image-overlay:' . esc_attr( isset( $attributes['imageOverlay'] ) ? $attributes['imageOverlay'] / 10 : 2/10 ) . ';"';

$output = '<div class="' . esc_attr( $wrapper_class ) . '"' . $style_attributes . '>';

	$output = '<div class="' . esc_attr( $wrapper_class ) . '"' . $style_attributes . '>';

	if ( $is_editor ) {
		$output = str_replace( '>', ' data-is-editor="true">', $output );
	}

	$output .= '<div class="' . esc_attr( $slider_class ) . '"' . $data_attributes . '>';
	$output .= '<div class="swiper-wrapper' . ( $is_editor ? ' editor-slider-wrapper' : '' ) . '">';

	global $post;

	foreach ( $posts as $post ) {
		setup_postdata( $post );

		ob_start();

		$slide_class = 'swiper-slide';
		if ( $display_mode === 'fullwidth' ) {
			$slide_class .= ' fullwidth-slide';
		}
		$slide_class .= ' ' . $display_mode . '-slide';

		?>
		<div class="swiper-slide <?php echo esc_attr( $slide_class ); ?>">
			<article class="nasio-post-card">
				<?php if ( $display_mode === 'fullwidth' ) : ?>
					<div class="nasio-post-thumbnail <?php echo ! has_post_thumbnail( $post ) ? 'no-thumbnail' : ''; ?>">
						<?php if ( has_post_thumbnail( $post ) && $show_featured_image ) : ?>
							<a href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail( 'full' ); ?>
							</a>
						<?php endif; ?>
						
						<div class="nasio-overlay-content">
							<h3 class="nasio-post-title">
								<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
							</h3>

							<?php if ( $show_author || $show_date ) : ?>
								<div class="nasio-post-meta">
									<?php if ( $show_date ) : ?>
										<span class="nasio-post-date"><?php echo esc_html( get_the_date() ); ?></span>
									<?php endif; ?>
									<?php if ( $show_author ) : ?>
										<span class="nasio-post-author">
											<?php esc_html_e( 'By ', 'nasio-blocks' ); ?>
											<?php echo esc_html( get_the_author() ); ?>
										</span>
									<?php endif; ?>
								</div>
							<?php endif; ?>

							<?php if ( $show_excerpt ) : ?>
								<div class="nasio-post-excerpt">
									<?php echo esc_html( wp_trim_words( get_the_excerpt(), 15 ) ); ?>
								</div>
							<?php endif; ?>
						</div>
					</div>
				<?php else : // Carousel mode ?>
					<?php if ( $show_featured_image && has_post_thumbnail( $post ) ) : ?>
						<div class="nasio-post-thumbnail">
							<a href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail( 'medium_large' ); ?>
							</a>
						</div>
					<?php elseif ( $show_fallback_image ) : ?>
						<div>
							<a href="<?php the_permalink(); ?>">
							<?php echo nasio_blocks_get_svg( 'fallback-svg' ); // // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</a>
						</div>
					<?php endif; ?>

					<div class="nasio-post-content">
						<h3 class="nasio-post-title">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</h3>
		
						<?php if ( $show_author || $show_date ) : ?>
							<div class="nasio-post-meta">
								<?php if ( $show_date ) : ?>
									<span class="nasio-post-date"><?php echo get_the_date(); ?></span>
								<?php endif; ?>
								<?php if ( $show_author ) : ?>
									<span class="nasio-post-author">
										<?php esc_html_e( 'By ', 'nasio-blocks' ); ?>
										<?php echo esc_html( get_the_author() ); ?>
									</span>
								<?php endif; ?>
							</div>
						<?php endif; ?>
		
						<?php if ( $show_excerpt ) : ?>
							<div class="nasio-post-excerpt">
								<?php echo esc_html( wp_trim_words( get_the_excerpt(), 15 ) ); ?>
							</div>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</article>
		</div>
		<?php
		$output .= ob_get_clean();
	}

	wp_reset_postdata();

	$output .= '</div>'; // .swiper-wrapper

	// Add Swiper pagination dots
	if ( $show_dots === 'true' ) {
		$output .= '<div class="swiper-pagination"></div>';
	}

	// Add Swiper navigation arrows
	if ( $show_arrows === 'true' ) {
		$output .= '<div class="swiper-button-prev"></div>';
		$output .= '<div class="swiper-button-next"></div>';
	}

	$output .= '</div>'; // .swiper
	$output .= '</div>'; // .wp-block-nasio-block-post-slider

	return $output;
}
