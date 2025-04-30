/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import * as allIcons from '@wordpress/icons';

/**
 * The save function for the icon block.
 *
 * @param {Object} props Block props.
 * @return {WPElement}   Element to render.
 */
export default function save({ attributes }) {
	const { 
		icon, 
		iconSize, 
		url, 
		linkTarget, 
		rel,
		backgroundColor,
		textColor,
		borderRadius,
		padding
	} = attributes;
	
	// Calculate block styles
	const blockStyles = {
		'--icon-size': `${iconSize}px`,
		'--background-color': backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : 'transparent',
		'--text-color': textColor ? `var(--wp--preset--color--${textColor})` : 'currentColor',
		'--border-radius': borderRadius ? `${borderRadius}px` : '0',
		'--padding': padding ? `${padding}px` : '0',
	};
	
	const blockProps = useBlockProps.save({
		className: 'wp-block-nasio-block-icon',
		style: blockStyles,
	});
	
	// Get the current icon
	const currentIcon = icon && allIcons[icon] ? allIcons[icon] : null;
	
	// Create icon content
	const iconContent = (
		<div className="nasio-icon-wrapper">
			{currentIcon && currentIcon}
		</div>
	);
	
	// Return block with or without link
	if (url) {
		return (
			<div {...blockProps}>
				<a 
					href={url}
					target={linkTarget}
					rel={rel}
				>
					{iconContent}
				</a>
			</div>
		);
	}
	
	return (
		<div {...blockProps}>
			{iconContent}
		</div>
	);
}
