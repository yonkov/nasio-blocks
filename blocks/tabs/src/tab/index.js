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
 * Register the tab block
 */
registerBlockType('nasio-block/tab', {
	edit: Edit,
	save,
});
