/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Register the accordion item block
 */
registerBlockType('nasio-block/accordion-item', {
	edit: Edit,
	save,
});