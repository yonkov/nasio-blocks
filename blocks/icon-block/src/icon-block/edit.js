/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	BlockControls,
	__experimentalLinkControl as LinkControl,
	JustifyToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToolbarGroup,
	ToolbarButton,
	RangeControl,
	Button,
	Popover,
	Modal,
	SearchControl,
	RadioControl,
	TextareaControl,
	Notice,
} from '@wordpress/components';
import { useState, useMemo, useCallback, useRef, useEffect } from '@wordpress/element';
import { link, linkOff, grid } from '@wordpress/icons';
/**
 * Import all WordPress icons
 */
import * as allIcons from '@wordpress/icons';

/**
 * The edit function for the icon block.
 *
 * @param {Object} props Block props.
 * @return {WPElement}   Element to render.
 */

function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
	  const later = () => {
		clearTimeout(timeout);
		func(...args);
	  };
	  clearTimeout(timeout);
	  timeout = setTimeout(later, wait);
	};
}

// Function to validate and sanitize SVG input
function validateSvg(svgString) {
	if (!svgString.trim()) {
		return { isValid: false, error: __('SVG cannot be empty', 'nasio-blocks') };
	}
	
	// Basic SVG validation - check if it starts with <svg and ends with </svg>
	const trimmedSvg = svgString.trim();
	if (!trimmedSvg.startsWith('<svg') || !trimmedSvg.endsWith('</svg>')) {
		return { 
			isValid: false, 
			error: __('Invalid SVG format. Must start with <svg and end with </svg>', 'nasio-blocks') 
		};
	}
	
	// Check for potentially dangerous content
	const dangerousPatterns = [
		/<script/i,
		/javascript:/i,
		/on\w+\s*=/i, // onclick, onload, etc.
		/<iframe/i,
		/<object/i,
		/<embed/i,
	];
	
	for (const pattern of dangerousPatterns) {
		if (pattern.test(trimmedSvg)) {
			return { 
				isValid: false, 
				error: __('SVG contains potentially unsafe content', 'nasio-blocks') 
			};
		}
	}
	
	return { isValid: true, error: null };
}

// Function to render custom SVG with proper styling
function renderCustomSvg(svgString, iconSize, textColor) {
	if (!svgString) return null;
	
	try {
		// Parse the SVG to modify its attributes
		const parser = new DOMParser();
		const doc = parser.parseFromString(svgString, 'image/svg+xml');
		const svgElement = doc.querySelector('svg');
		
		if (!svgElement) return null;

		// Add custom class for styling differentiation
		svgElement.classList.add('custom-svg');
		
		// Apply size and color styling
		svgElement.setAttribute('width', iconSize);
		svgElement.setAttribute('height', iconSize);
		
		// Apply color to fill attribute if textColor is set
		if (textColor) {
			const colorValue = textColor.startsWith('var(') ? textColor : `var(--wp--preset--color--${textColor})`;
			if (svgElement.style) {
				svgElement.style.color = colorValue;
			} else {
				const currentStyle = svgElement.getAttribute('style') || '';
				svgElement.setAttribute('style', `${currentStyle}${currentStyle && !currentStyle.endsWith(';') ? ';' : ''}color:${colorValue}`);
			}
		}
		
		// Return the modified SVG as JSX
		return <div dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }} />;
	} catch (error) {
		console.error('Error parsing custom SVG:', error);
		return <span>{__('Invalid SVG', 'nasio-blocks')}</span>;
	}
}

export default function Edit({ attributes, setAttributes }) {
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
		itemsJustification = 'center',
	} = attributes;

	const [isEditingURL, setIsEditingURL] = useState(false);
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [svgValidation, setSvgValidation] = useState({ isValid: true, error: null });

	// Validate custom SVG when it changes
	useEffect(() => {
		if (iconType === 'custom' && customSvg) {
			const validation = validateSvg(customSvg);
			setSvgValidation(validation);
		} else {
			setSvgValidation({ isValid: true, error: null });
		}
	}, [customSvg, iconType]);

	// Get all available WordPress icons
	const availableIcons = useMemo(() => {
		return Object.entries(allIcons)
			.filter(([name, iconObj]) =>
				typeof iconObj === 'object' &&
				iconObj !== null &&
				iconObj.type &&
				iconObj.props &&
				name !== 'Icon' // Exclude the base Icon component
			)
			.map(([name, iconObj]) => ({
				name,
				icon: iconObj,
				label: name.replace(/([A-Z])/g, ' $1').trim(),
			}));
	}, []);

	// Get the current icon based on type
	const getCurrentIcon = () => {
		if (iconType === 'custom') {
			if (customSvg && svgValidation.isValid) {
				return renderCustomSvg(customSvg, iconSize, textColor);
			}
			return <span className="custom-svg-placeholder">{__('Add custom SVG', 'nasio-blocks')}</span>;
		}
		return icon && allIcons[icon] ? allIcons[icon] : null;
	};

	const currentIcon = getCurrentIcon();

	// Calculate block styles
	const blockStyles = {
		'--icon-size': `${iconSize}px`,
		'--background-color': backgroundColor ? `var(--wp--preset--color--${backgroundColor})` : 'transparent',
		'--text-color': textColor ? `var(--wp--preset--color--${textColor})` : 'currentColor',
		'--border-radius': borderRadius ? `${borderRadius}px` : '0',
	};

	// Get block props with styles
	const blockProps = useBlockProps({
		className: 'wp-block-nasio-block-icon',
		style: blockStyles,
	});

	// Icon picker modal component
	const IconPicker = ({ isOpen, onClose }) => {
		const [searchTerm, setSearchTerm] = useState('');
		const searchInputRef = useRef(null);

		// Debounced search handler
		const debouncedSetSearchTerm = useCallback(
			debounce((value) => {
				setSearchTerm(value);
			}, 300),
			[]
		);

		// Reset search term when modal closes
		useEffect(() => {
			if (!isOpen) {
				setSearchTerm('');
			}
		}, [isOpen]);

		// Maintain focus on search input
		useEffect(() => {
			if (isOpen && searchInputRef.current) {
				searchInputRef.current.focus();
			}
		}, [isOpen, searchTerm]);

		// Filter icons based on search term
		const filteredIcons = useMemo(() => {
			return searchTerm
				? availableIcons.filter((iconObj) =>
						iconObj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						iconObj.label.toLowerCase().includes(searchTerm.toLowerCase())
				  )
				: availableIcons;
		}, [searchTerm]);

		if (!isOpen) return null;

		return (
			<Modal
				title={__('Select an Icon', 'nasio-blocks')}
				onRequestClose={onClose}
				isDismissible={true}
				className="wp-block-nasio-block-icon-picker-modal"
				shouldCloseOnClickOutside={false}
			>
				<div className="icon-picker-search">
					<SearchControl
						value={searchTerm}
						onChange={debouncedSetSearchTerm}
						placeholder={__('Search icons...', 'nasio-blocks')}
						ref={searchInputRef}
					/>
					<p className="icon-count">
						{filteredIcons.length} {__('icons found', 'nasio-blocks')}
					</p>
				</div>

				<div className="icon-picker-grid">
					{filteredIcons.map((iconObj) => (
						<Button
							key={iconObj.name}
							className={`icon-picker-button ${iconObj.name === icon ? 'is-selected' : ''}`}
							onClick={() => {
								setAttributes({ icon: iconObj.name });
								onClose();
							}}
						>
							<div className="icon-preview">{iconObj.icon}</div>
							<div className="icon-name">{iconObj.label}</div>
						</Button>
					))}
				</div>
			</Modal>
		);
	};

	return (
		<>
			<BlockControls>
				<JustifyToolbar
					value={itemsJustification}
					onChange={(newJustification) => setAttributes({ itemsJustification: newJustification })}
					allowJustify
				/>
				<ToolbarGroup>
					{iconType === 'wordpress' && (
						<ToolbarButton
							icon={grid}
							label={__('Choose Icon', 'nasio-blocks')}
							onClick={() => setIsIconPickerOpen(true)}
						/>
					)}
					<ToolbarButton
						icon={url ? link : linkOff}
						label={url ? __('Edit link', 'nasio-blocks') : __('Add link', 'nasio-blocks')}
						onClick={() => setIsEditingURL(!isEditingURL)}
						isPressed={isEditingURL}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Icon Settings', 'nasio-blocks')}>
					<RadioControl
						label={__('Icon Type', 'nasio-blocks')}
						selected={iconType}
						options={[
							{ label: __('WordPress Icons', 'nasio-blocks'), value: 'wordpress' },
							{ label: __('Custom SVG', 'nasio-blocks'), value: 'custom' },
						]}
						onChange={(value) => setAttributes({ iconType: value })}
					/>

					{iconType === 'wordpress' && (
						<>
							<div className="icon-picker-preview">
								<div className="selected-icon-preview">
									{icon && allIcons[icon] ? allIcons[icon] : <span>No icon selected</span>}
								</div>
								<Button
									variant="secondary"
									onClick={() => setIsIconPickerOpen(true)}
								>
									{__('Choose Icon', 'nasio-blocks')}
								</Button>
							</div>
						</>
					)}

					{iconType === 'custom' && (
						<>
							<TextareaControl
								label={__('Custom SVG Code', 'nasio-blocks')}
								value={customSvg}
								onChange={(value) => setAttributes({ customSvg: value })}
								placeholder={__('Add your SVG code here...', 'nasio-blocks')}
								help={__('Enter valid SVG markup.', 'nasio-blocks')}
								rows={6}
							/>
							
							{!svgValidation.isValid && (
								<Notice status="error" isDismissible={false}>
									{svgValidation.error}
								</Notice>
							)}

							{customSvg && svgValidation.isValid && (
								<div className="custom-svg-preview">
									<label>{__('Preview:', 'nasio-blocks')}</label>
									<div className="selected-icon-preview">
										{renderCustomSvg(customSvg, iconSize, textColor)}
									</div>
								</div>
							)}
						</>
					)}

					<RangeControl
						label={__('Size (px)', 'nasio-blocks')}
						value={iconSize}
						onChange={(value) => setAttributes({ iconSize: value })}
						min={12}
						max={120}
						step={1}
					/>
				</PanelBody>
			</InspectorControls>

			{isEditingURL && (
				<Popover
					position="bottom center"
					onClose={() => setIsEditingURL(false)}
				>
					<LinkControl
						searchInputPlaceholder={__('Search or type URL', 'nasio-blocks')}
						value={{
							url,
							opensInNewTab: linkTarget === '_blank',
						}}
						onChange={({ url: newURL, opensInNewTab }) => {
							setAttributes({
								url: newURL,
								linkTarget: opensInNewTab ? '_blank' : '_self',
								rel: opensInNewTab ? 'noopener noreferrer' : '',
							});
						}}
						onRemove={() => {
							setAttributes({
								url: '',
								linkTarget: '_self',
								rel: '',
							});
						}}
					/>
				</Popover>
			)}

			<IconPicker
				isOpen={isIconPickerOpen}
				onClose={() => setIsIconPickerOpen(false)}
			/>

			<div {...blockProps}>
				<div className={`nasio-icon-wrapper is-justified-${itemsJustification}`}>{currentIcon && currentIcon}</div>
			</div>
		</>
	);
}