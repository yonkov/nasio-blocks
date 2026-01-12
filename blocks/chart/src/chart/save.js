/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Block save properties.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const {
        chartType,
        chartData,
        chartDatasets,
        chartColors,
        chartTitle,
        showLegend,
        legendPosition,
        chartWidth,
        chartHeight,
        backgroundColor,
        borderColor,
        borderWidth,
        showDataLabels,
        dataUnit,
        unitPosition,
        labelThreshold
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `wp-block-nasio-block-chart chart-type-${chartType}`,
        'data-chart-type': chartType,
        'data-chart-data': JSON.stringify(chartData),
        'data-chart-datasets': JSON.stringify(chartDatasets || []),
        'data-chart-colors': JSON.stringify(chartColors),
        'data-chart-title': chartTitle,
        'data-show-legend': showLegend,
        'data-legend-position': legendPosition,
        'data-chart-width': chartWidth,
        'data-chart-height': chartHeight,
        'data-background-color': backgroundColor || '',
        'data-border-color': borderColor || '',
        'data-border-width': borderWidth,
        'data-show-data-labels': showDataLabels,
        'data-data-unit': dataUnit || '',
        'data-unit-position': unitPosition || 'after',
        'data-label-threshold': labelThreshold || '',
    });

    return (
        <div {...blockProps}>
            <div 
                className="chart-container"
                style={{ 
                    width: `${chartWidth}px`, 
                    height: `${chartHeight}px`,
                    margin: '0 auto',
                    position: 'relative',
                    ...(backgroundColor && { backgroundColor }),
                    ...(borderColor && { border: `${borderWidth}px solid ${borderColor}` })
                }}
            >
                <canvas className="nasio-chart-canvas"></canvas>
            </div>
        </div>
    );
}
