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
 * Register the accordion block
 */
registerBlockType('nasio-block/accordion', {
	edit: Edit,
	save,
});