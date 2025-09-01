/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	ColorPalette,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	InspectorAdvancedControls,
	PanelColorSettings
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TextControl,
	ColorPicker,
	RangeControl,
	ToggleControl,
	__experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { formatBold } from '@wordpress/icons';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		targetDate,
		targetTime,
		daysLabel,
		hoursLabel,
		minutesLabel,
		secondsLabel,
		spacing,
		textAlign,
		fontWeight,
		unitBackgroundColor,
		unitBorderColor,
		unitBorderWidth,
		unitBorderRadius,
		delimiter,
		unitPrefix
	} = attributes;

	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	// Calculate time left
	function calculateTimeLeft() {
		if (!targetDate) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		const targetDateTime = new Date(`${targetDate} ${targetTime}`);
		const now = new Date();
		const difference = targetDateTime - now;

		if (difference > 0) {
			return {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		} else {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}
	}

	// Format number with optional zero padding
	function formatNumber(num) {
		return unitPrefix ? num.toString().padStart(2, '0') : num.toString();
	}

	// Update countdown every second
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		// Calculate initial time
		setTimeLeft(calculateTimeLeft());

		return () => clearInterval(timer);
	}, [targetDate, targetTime]);

	// Get date two days ahead from today in YYYY-MM-DD format for date input default
	function getDefaultDate() {
		const today = new Date();
		today.setDate(today.getDate() + 2); // Add 2 days
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	// Set default date if none is set
	useEffect(() => {
		if (!targetDate) {
			setAttributes({ targetDate: getDefaultDate() });
		}
	}, []);

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const blockProps = useBlockProps({
		className: `has-text-align-${textAlign}`,
		style: {
			'--countdown-spacing': `${spacing}px`,
			'--countdown-delimiter': delimiter ? `"${delimiter}"` : '""',
			'--countdown-unit-background-color': unitBackgroundColor || 'transparent',
			'--countdown-unit-border-radius': `${unitBorderRadius}px`,
			...(unitBorderWidth > 0 && {
				'--countdown-unit-border-color': unitBorderColor || 'currentColor',
				'--countdown-unit-border-size': `${unitBorderWidth}px`,
			}),
			fontWeight: fontWeight
		}
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<AlignmentToolbar
						value={textAlign}
						onChange={(newAlignment) => setAttributes({ textAlign: newAlignment })}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={formatBold}
						title={__('Bold', 'nasio-blocks')}
						isActive={fontWeight === 'bold'}
						onClick={() => setAttributes({ 
							fontWeight: fontWeight === 'bold' ? 'normal' : 'bold' 
						})}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Countdown Settings', 'nasio-blocks')} initialOpen={true}>
					<PanelRow>
						<TextControl
							label={__('Target Date', 'nasio-blocks')}
							type="date"
							value={targetDate}
							onChange={(newDate) => setAttributes({ targetDate: newDate })}
							help={__('Select the target date for the countdown.', 'nasio-blocks')}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Target Time', 'nasio-blocks')}
							type="time"
							value={targetTime}
							onChange={(newTime) => setAttributes({ targetTime: newTime })}
							help={__('Select the target time for the countdown.', 'nasio-blocks')}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Days Label', 'nasio-blocks')}
							value={daysLabel}
							onChange={(newLabel) => setAttributes({ daysLabel: newLabel })}
							help={__('Leave empty to hide the days unit.', 'nasio-blocks')}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Hours Label', 'nasio-blocks')}
							value={hoursLabel}
							onChange={(newLabel) => setAttributes({ hoursLabel: newLabel })}
							help={__('Leave empty to hide the hours unit.', 'nasio-blocks')}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Minutes Label', 'nasio-blocks')}
							value={minutesLabel}
							onChange={(newLabel) => setAttributes({ minutesLabel: newLabel })}
							help={__('Leave empty to hide the minutes unit.', 'nasio-blocks')}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Seconds Label', 'nasio-blocks')}
							value={secondsLabel}
							onChange={(newLabel) => setAttributes({ secondsLabel: newLabel })}
							help={__('Leave empty to hide the seconds unit.', 'nasio-blocks')}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Unit Delimiter', 'nasio-blocks')}
							value={delimiter}
							onChange={(newDelimiter) => setAttributes({ delimiter: newDelimiter })}
							help={__('Character(s) to display between time units (e.g. ":", "-", " | ")', 'nasio-blocks')}
							placeholder={__(':', 'nasio-blocks')}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Unit Prefix', 'nasio-blocks')}
							checked={unitPrefix}
							onChange={(newUnitPrefix) => setAttributes({ unitPrefix: newUnitPrefix })}
							help={__('Display time units with leading zeros (e.g. "02" instead of "2")', 'nasio-blocks')}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelColorSettings
					title={__('Unit Styles', 'nasio-blocks')}
					initialOpen={true}
					colorSettings={[
						{
							value: unitBackgroundColor,
							onChange: (color) => setAttributes({ unitBackgroundColor: color }),
							label: __('Unit Background', 'nasio-blocks'),
							disableCustomColors: false,
							clearable: true,
						},
						{
							value: unitBorderColor,
							onChange: (color) => setAttributes({ unitBorderColor: color }),
							label: __('Unit Border Color', 'nasio-blocks'),
							disableCustomColors: false,
							clearable: true,
						},
					]}
				>
					<RangeControl
						label={__('Spacing Between Units (px)', 'nasio-blocks')}
						value={spacing}
						onChange={(newSpacing) => setAttributes({ spacing: newSpacing })}
						min={0}
						max={50}
						step={1}
					/>
					<RangeControl
						label={__('Border Width (px)', 'nasio-blocks')}
						value={unitBorderWidth}
						onChange={(newWidth) => setAttributes({ unitBorderWidth: newWidth })}
						min={0}
						max={10}
						step={1}
					/>
					<RangeControl
						label={__('Border Radius (px)', 'nasio-blocks')}
						value={unitBorderRadius}
						onChange={(newRadius) => setAttributes({ unitBorderRadius: newRadius })}
						min={0}
						max={50}
						step={1}
					/>
				</PanelColorSettings>
			</InspectorControls>

			<div {...blockProps}>
				<div className="countdown-container">
					{daysLabel && (
						<>
							<div className="countdown-unit">
								<span className="countdown-number">{formatNumber(timeLeft.days)}</span>
								<span className="countdown-label">{daysLabel}</span>
							</div>
							{(hoursLabel || minutesLabel || secondsLabel) && delimiter && (
								<span className="countdown-delimiter">{delimiter}</span>
							)}
						</>
					)}
					{hoursLabel && (
						<>
							<div className="countdown-unit">
								<span className="countdown-number">{formatNumber(timeLeft.hours)}</span>
								<span className="countdown-label">{hoursLabel}</span>
							</div>
							{(minutesLabel || secondsLabel) && delimiter && (
								<span className="countdown-delimiter">{delimiter}</span>
							)}
						</>
					)}
					{minutesLabel && (
						<>
							<div className="countdown-unit">
								<span className="countdown-number">{formatNumber(timeLeft.minutes)}</span>
								<span className="countdown-label">{minutesLabel}</span>
							</div>
							{secondsLabel && delimiter && (
								<span className="countdown-delimiter">{delimiter}</span>
							)}
						</>
					)}
					{secondsLabel && (
						<div className="countdown-unit">
							<span className="countdown-number">{formatNumber(timeLeft.seconds)}</span>
							<span className="countdown-label">{secondsLabel}</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
