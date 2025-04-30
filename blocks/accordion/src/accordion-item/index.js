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
 * Register the accordion item block
 */
registerBlockType('nasio-block/accordion-item', {
	edit: Edit,
	save,
}); 