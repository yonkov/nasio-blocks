/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: `wp-block-nasio-block-countdown has-text-align-${textAlign}`,
		'data-target-date': targetDate,
		'data-target-time': targetTime,
		'data-days-label': daysLabel,
		'data-hours-label': hoursLabel,
		'data-minutes-label': minutesLabel,
		'data-seconds-label': secondsLabel,
		'data-delimiter': delimiter,
		'data-unit-prefix': unitPrefix,
		style: {
			'--countdown-spacing': `${spacing}px`,
			'--countdown-delimiter': delimiter ? `"${delimiter}"` : '""',
			'--countdown-unit-background-color': unitBackgroundColor || 'transparent',
			'--countdown-unit-border-radius': `${unitBorderRadius}px`,
			...(unitBorderWidth > 0 && {
				'--countdown-unit-border-color': unitBorderColor || 'currentColor',
				'--countdown-unit-border-size': `${unitBorderWidth}px`,
			}),
			fontWeight: fontWeight,
			...(attributes.style?.spacing?.padding && {
				paddingTop: attributes.style.spacing.padding.top,
				paddingRight: attributes.style.spacing.padding.right,
				paddingBottom: attributes.style.spacing.padding.bottom,
				paddingLeft: attributes.style.spacing.padding.left
			}),
			...(attributes.style?.spacing?.margin && {
				marginTop: attributes.style.spacing.margin.top,
				marginRight: attributes.style.spacing.margin.right,
				marginBottom: attributes.style.spacing.margin.bottom,
				marginLeft: attributes.style.spacing.margin.left
			})
		}
	});

	return (
		<div {...blockProps}>
			<div className="countdown-container">
				{daysLabel && (
					<>
						<div className="countdown-unit">
							<span className="countdown-number" data-unit="days">0</span>
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
							<span className="countdown-number" data-unit="hours">0</span>
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
							<span className="countdown-number" data-unit="minutes">0</span>
							<span className="countdown-label">{minutesLabel}</span>
						</div>
						{secondsLabel && delimiter && (
							<span className="countdown-delimiter">{delimiter}</span>
						)}
					</>
				)}
				{secondsLabel && (
					<div className="countdown-unit">
						<span className="countdown-number" data-unit="seconds">0</span>
						<span className="countdown-label">{secondsLabel}</span>
					</div>
				)}
			</div>
		</div>
	);
}
