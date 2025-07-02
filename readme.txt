=== Nasio Blocks ===
Contributors: nasiothemes
Plugin Name: Nasio Blocks
Plugin URI: https://github.com/yonkov/nasio-blocks
Tags: gutenberg, blocks, gutenberg blocks, swiper
Author URI: https://nasiothemes.com/
Author: Nasio Themes
Requires at least: 6.7
Requires PHP: 7.2
Tested up to: 6.8
Stable tag: 1.0.5
License: GPLv2

Small collection of essential blocks for the WordPress Block editor

== Description ==
Custom Gutenberg Blocks for the WordPress Block editor. Easy to use, lightweight and super useful. Post slider, Content slider, Gallery slider, Tabs, Accordeon, and Icon blocks. Features a template library with predefined demo content (block patterns) to speed up the page creation process. No unnecessary code to slow you down - you can choose which blocks to activate for maximum performance.

== Features ==

#### [Post Slider Block](https://nasio-blocks.nasiothemes.com/post-slider/)

Display your latest posts in a beautiful responsive slider using [Swiper.js](https://swiperjs.com) - lightweight and fully responsive vanilla JS slider with RTL support.

* Choose between Fullwidth Slider (single column) or Carousel (multi-column slider) display mode
* Fully customizable settings for number of posts, category filtering and flexible display options
* Responsive design that works on all devices
* Support for featured images, excerpts, post metadata and more

#### [Content Slider Block](https://nasio-blocks.nasiothemes.com/content-slider/)

Create beautiful responsive sliders using the WordPress [Cover block](https://wordpress.org/documentation/article/cover-block/) and Swiper.js.

* Choose between Fullwidth Slider or Carousel (multi-column slider) display mode
* Fully customizable settings for slider behavior
* Ability to add, delete and edit slides through the familiar Block Editor interface
* Responsive design that works on all devices

#### [Gallery Slider Block](https://nasio-blocks.nasiothemes.com/gallery-slider/)

Display galleries in beautiful multi-column carousels.

* Fully customizable settings for slider behavior
* Ability to add a gallery using the familiar Block Editor interface
* Ability to set custom image sizes
* Responsive design that works on all devices

#### [Icon Block](https://nasio-blocks.nasiothemes.com/svg-icon/)

Display svg icons from the WordPress [Icons Library](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/) or upload custom svg icons. Allow users to add beautiful and scalable svg icons on their website without excessive font libraries - only the specified icons are loaded on the frontend.

* Different font size, color and background color
* Different spacing options
* Option to add custom svg icons

#### [Accordeon Block](https://nasio-blocks.nasiothemes.com/accordeon/)

Display FAQ-style section in the form of expandable/collabsible dropdowns.

* Show a default Open Item
* Change header background and text color

#### [Tabs Block](https://nasio-blocks.nasiothemes.com/tabs/)

Create organized content sections with tabbed navigation.

* Customizable tab colors and styling
* Set default active tab
* Responsive design that stacks tabs vertically on mobile
* Easy content management through the Block Editor interface

= Template Library =

List of Block patterns (ready to use demo content) created with the Block Editor.

== Installation ==
1. Take the easy route and install through the WordPress plugin installer or download the .zip file and upload the unzipped folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Add the blocks to your posts or pages using the WordPress Block Editor

== Frequently Asked Questions ==

= How do I add a Post Slider to my page? =
Simply edit a page or post with the Block Editor, click the "+" button to add a new block, and search for "Post Slider". Add the block and customize its settings in the sidebar.

= Can I customize how many posts appear in the post slider? =
Yes, you can set the number of posts to display, filter by category, and adjust how many slides appear at once on different screen sizes.

= Can I customize the height and the overlay ratio of the content slider? =
Yes, you can control these settings per slide. Select a cover block from the content slider, click on Styles tab and adjust accordingly.

= Do the sliders work on mobile devices? =
Yes, the sliders are fully responsive and will automatically adjust the number of visible slides based on the screen size.

= I don't have time and patience to create content from scratch. Are there templates with demo content that I can use to speed things up? =
Yes, the plugin registers block patterns that can easily be imported to your posts and pages. Simply go to the Block Editor, click on "Template Library" in the top left-hand side of the screen and insert the pattern of choice. We will be adding more patterns in the future.

= I need only the icon and the accordeon block. I don't want a slider. Can I switch on or off blocks that I don't plan to use? =
Yes, in the plugin settings page, you can choose which blocks to enable for maximum performance.

== Changelog ==

= 1.0.5 - June 2025 =
* Improve slider blocks to adjust arrow and dot colors.

= 1.0.4 - June 2025 =
* Add tabs block. Clean up code.

= 1.0.3 - May 2025 =
* Improve theme compatibility and add fullwidth slider pattern.Add option to add custom svg icons.

= 1.0.2 - May 2025 =
* Improve the gallery slider, fix post slider ServerRender and update the template library to include partners and features pattern. Improve sliders styles.

= 1.0.1 - May 2025 =
* Fix content slider block editor initialization issue and testimonial pattern display. Improve docs.

= 1.0.0 - May 2025 =
* Update docs, improve slides and add template library with predefined layouts

= 0.0.2 - May 2025 =
* Update plugin main file name and add Nasio Themes as an author and contributor. Update slider blocks to have slidesPerGroup property, improve gallery slider and accordeon blocks functionality.

= 0.0.1 - May 2025 =
* First plugin version.
* Added Post Slider block, Content slider and Gallery slider with Swiper.js integration. Added Accordeon block. Added icon block.

== Screenshots ==

1. FAQ pattern (Accordeon block)
2. Testimonials pattern (Content slider block)
3. Testimonials pattern 2 (Content slider block)
4. Hero pattern (Content slider block)
5. Partners pattern (Gallery slider block)
6. Features pattern (Icon block)
7. Template library