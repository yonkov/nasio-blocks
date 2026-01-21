/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import * as allIcons from '@wordpress/icons';
import DOMPurify from 'dompurify';

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
				// Sanitize the SVG string using DOMPurify
				const sanitizedSvg = DOMPurify.sanitize(customSvg, { USE_PROFILES: { svg: true } });

				// Parse the SVG to modify its attributes
				const parser = new DOMParser();
				const doc = parser.parseFromString(sanitizedSvg, 'image/svg+xml');
				const svgElement = doc.querySelector('svg');

				if (svgElement) {
					// Add custom class for styling differentiation
					svgElement.classList.add('custom-svg');

					// Apply size attributes
					svgElement.setAttribute('width', iconSize);
					svgElement.setAttribute('height', iconSize);
					svgElement.setAttribute('aria-hidden', 'true');
					
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
	
	// Create icon content with screen reader text
	const iconContent = (
		<div className={`nasio-icon-wrapper is-justified-${itemsJustification}`}>
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
