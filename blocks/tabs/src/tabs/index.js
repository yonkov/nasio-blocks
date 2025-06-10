/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

/**
 * Register the tabs block
 */
registerBlockType('nasio-block/tabs', {
	edit: Edit,
	save,
});
