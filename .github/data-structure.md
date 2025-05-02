---
description: 
globs: 
alwaysApply: true
---
Recommended file structure for this WordPress plugin:

your-plugin/
├── blocks/
│   └── content-slider/
│   	└── .gitinore
│   	└── package.json
│       └── content-slider.php
│   	└── build/
│   	└── src/
│   		└── content-slider/
│       		├── block.json
│       		├── edit.js
│       		├── view.js
│       		├── save.js
│       		├── editor.scss
│       		├── style.scss
│       		├── render.php
├── assets/
│   └── lib/
│       ├── swiper.min.js
│       └── swiper.min.css
├── index.php
└── readme.txt

When I prompt you to create a new WordPress block, follow this file structure and use the content slider as an example WordPress block. Take a look at the files of the content slider block for reference how to implement new features in the new block. Use the block.json of the content slider block for reference how to create the block.json of the new block. All the blocks in this plugin need to have a build step and to use wp-scripts dependency. The build folder should not be added to .gitignore.