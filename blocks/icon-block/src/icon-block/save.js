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
		iconType,
		icon, 
		customSvg,
		iconSize, 
		url, 
		linkTarget, 
		rel,
		backgroundColor,
		textColor,
		borderRadius,
		padding,
		itemsJustification = 'center',
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
	
	// Get the current icon based on type
	const getCurrentIcon = () => {
		if (iconType === 'custom' && customSvg) {
			// For custom SVG, we need to sanitize and render it safely
			try {
				// Parse the SVG to modify its attributes
				const parser = new DOMParser();
				const doc = parser.parseFromString(customSvg, 'image/svg+xml');
				const svgElement = doc.querySelector('svg');
				
				if (svgElement) {
					// Apply size attributes
					svgElement.setAttribute('width', iconSize);
					svgElement.setAttribute('height', iconSize);
					svgElement.setAttribute('fill', 'currentColor');
					
					// Return as dangerouslySetInnerHTML for frontend rendering
					return <div dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }} />;
				}
			} catch (error) {
				console.error('Error parsing custom SVG:', error);
				return null;
			}
		}
		
		// For WordPress icons
		return icon && allIcons[icon] ? allIcons[icon] : null;
	};
	
	const currentIcon = getCurrentIcon();
	
	// Generate screen reader text from icon name
	const getScreenReaderText = () => {
		if (iconType === 'custom') {
			return 'icon';
		}
		// Convert camelCase icon name to readable text
		// e.g., "starFilled" becomes "star filled"
		return icon 
			? icon.replace(/([A-Z])/g, ' $1').trim().toLowerCase()
			: 'icon';
	};
	
	// Create icon content with screen reader text
	const iconContent = (
		<div className={`nasio-icon-wrapper is-justified-${itemsJustification}`}>
			{currentIcon && currentIcon}
			<span className="screen-reader-text">{getScreenReaderText()}</span>
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
