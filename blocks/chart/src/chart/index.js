/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Style dependencies
 */
import './editor.scss';
import './style.scss';

/**
 * Block registration
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
