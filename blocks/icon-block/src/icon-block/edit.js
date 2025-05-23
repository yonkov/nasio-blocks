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
	BlockVerticalAlignmentToolbar,
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

export default function Edit({ attributes, setAttributes }) {
	const {
		icon,
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

	// Get the current icon
	const currentIcon = icon && allIcons[icon] ? allIcons[icon] : null;

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
					<ToolbarButton
						icon={grid}
						label={__('Choose Icon', 'nasio-blocks')}
						onClick={() => setIsIconPickerOpen(true)}
					/>
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
					<div className="icon-picker-preview">
						<div className="selected-icon-preview">
							{currentIcon ? currentIcon : <span>No icon selected</span>}
						</div>
						<Button
							variant="secondary"
							onClick={() => setIsIconPickerOpen(true)}
						>
							{__('Choose Icon', 'nasio-blocks')}
						</Button>
					</div>

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