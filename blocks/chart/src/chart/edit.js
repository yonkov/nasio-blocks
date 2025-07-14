/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
    RangeControl,
    Button,
    __experimentalInputControl as InputControl,
} from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * The edit function for the chart block.
 *
 * @param {Object} props               Block props.
 * @param {Object} props.attributes    Block attributes.
 * @param {Object} props.setAttributes Block setAttributes function.
 * @param {string} props.clientId      Block client ID.
 * @param {string} props.className     Class name from the block editor.
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId, className }) {
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

    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [isChartJSLoaded, setIsChartJSLoaded] = useState(false);

    // Handle responsive behavior on window resize
    useEffect(() => {
        function handleResize() {
            if (canvasRef.current) {
                const container = canvasRef.current.parentElement;
                if (container) {
                    const isLargeScreen = window.innerWidth >= 640;
                    
                    if (isLargeScreen) {
                        container.style.width = `${chartWidth}px`;
                        container.style.height = `${chartHeight}px`;
                    } else {
                        container.style.width = '';
                        container.style.height = '';
                    }
                }
            }
        }

        // Helper to avoid excessive resize events
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

        window.addEventListener('resize', debounce(handleResize, 150));

        return () => {
            window.removeEventListener('resize', debounce(handleResize, 150));
        };
    }, [chartWidth, chartHeight]);

    useEffect(() => {
        if (typeof window.Chart !== 'undefined') {
            setIsChartJSLoaded(true);
        } else {
            // If Chart.js isn't loaded immediately, log an error
            console.error('Chart.js not available. Make sure the chart block is enabled in plugin settings.');
        }
    }, []);

    // Initialize and update chart
    useEffect(() => {
        if (!isChartJSLoaded || !canvasRef.current) {
            return;
        }

        // Destroy existing chart
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Prepare chart configuration
        const config = {
            type: chartType === 'doughnut' ? 'doughnut' : chartType,
            data: {
                labels: chartData.map(item => item.label),
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: !!chartTitle,
                        text: chartTitle
                    },
                    legend: {
                        display: showLegend,
                        position: legendPosition
                    }
                }
            }
        };

        // Configure tooltip callbacks for data units (for all chart types)
        if (dataUnit) {
            if (!config.options.plugins) {
                config.options.plugins = {};
            }
            config.options.plugins.tooltip = {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        let label = '';
                        const unit = dataUnit || '';
                        const value = chartType === 'pie' || chartType === 'doughnut' ? context.parsed : context.parsed.y;
                        
                        if (chartType === 'pie' || chartType === 'doughnut') {
                            label = unitPosition === 'before' ? unit + value : value + unit;
                        } else {
                            // For bar and line charts
                            if (context.dataset.label) {
                                label = context.dataset.label + ': ';
                            }
                            label += unitPosition === 'before' ? unit + value : value + unit;
                        }
                        return label;
                    }
                }
            };
        }

        // Configure datasets based on chart type
        if (chartType === 'line' || chartType === 'bar') {
            // Use multiple datasets for bar and line charts
            config.data.datasets = chartDatasets.map((dataset, datasetIndex) => {
                const datasetColor = chartColors[datasetIndex] || '#36A2EB';
                return {
                    label: dataset.label || `Dataset ${datasetIndex + 1}`,
                    data: dataset.data || chartData.map(() => 0),
                    backgroundColor: chartType === 'bar' 
                        ? (() => {
                            // Convert hex to rgba with 0.6 opacity for bars
                            const hex = datasetColor.replace('#', '');
                            const r = parseInt(hex.substr(0, 2), 16);
                            const g = parseInt(hex.substr(2, 2), 16);
                            const b = parseInt(hex.substr(4, 2), 16);
                            return `rgba(${r}, ${g}, ${b}, 0.6)`;
                        })()
                        : (() => {
                            // Convert hex to rgba with 0.6 opacity for line area
                            const hex = datasetColor.replace('#', '');
                            const r = parseInt(hex.substr(0, 2), 16);
                            const g = parseInt(hex.substr(2, 2), 16);
                            const b = parseInt(hex.substr(4, 2), 16);
                            return `rgba(${r}, ${g}, ${b}, 0.6)`;
                        })(),
                    borderColor: datasetColor
                };
            });
            
            config.options.scales = {
                y: {
                    beginAtZero: true
                }
            };
        } else {
            // Use single dataset for pie and doughnut charts (from chartData)
            config.data.datasets = [{
                label: chartTitle || 'Dataset',
                data: chartData.map(item => item.value),
                backgroundColor: chartColors.slice(0, chartData.length),
                borderColor: chartColors.slice(0, chartData.length)
            }];

            // Configure data labels for pie/doughnut charts
            if (showDataLabels) {
                // Add custom plugin for data labels
                config.plugins = [{
                    afterDatasetsDraw: function(chart) {
                        const ctx = chart.ctx;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.font = 'regular 11px Arial';
                        ctx.fillStyle = '#fff'; // White text color for data labels
                        const dataset = chart.data.datasets[0];
                        const meta = chart.getDatasetMeta(0);
                        
                        meta.data.forEach((element, index) => {
                            if (!element.circumference || element.circumference === 0) return; // Skip hidden segments
                            
                            const data = dataset.data[index];
                            
                            // Skip if data is below threshold
                            if (data < (labelThreshold !== undefined ? labelThreshold : 0)) return;
                            
                            const unit = dataUnit || '';
                            const label = unitPosition === 'before' ? unit + data : data + unit;
                            
                            const position = element.tooltipPosition();
                            ctx.fillText(label, position.x, position.y);
                        });
                    }
                }];
            } else {
                // Ensure no data label plugins when disabled
                config.plugins = [];
            }
        }

        try {
            chartInstanceRef.current = new window.Chart(canvasRef.current, config);
            
            // Apply dimensions to container via JavaScript for consistency with frontend
            const container = canvasRef.current.parentElement;
            if (container) {
                // Only apply fixed dimensions on larger screens (40rem = 640px)
                const isLargeScreen = window.innerWidth >= 640;
                
                if (isLargeScreen) {
                    container.style.width = `${chartWidth}px`;
                    container.style.height = `${chartHeight}px`;
                } else {
                    // Remove fixed dimensions on smaller screens to allow responsive behavior
                    container.style.width = '';
                    container.style.height = '';
                }
            }
        } catch (error) {
            console.error('Error creating chart:', error);
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [
        isChartJSLoaded,
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
    ]);

    const blockProps = useBlockProps({
        className: `wp-block-nasio-block-chart chart-type-${chartType} ${className || ''}`,
    });

    // Add new data item
    function addDataItem() {
        const newItem = {
            label: `Item ${chartData.length + 1}`,
            value: 10
        };
        const newChartData = [...chartData, newItem];
        setAttributes({ chartData: newChartData });

        // For pie/doughnut charts, also add a default color
        if (chartType === 'pie' || chartType === 'doughnut') {
            const defaultColors = ['#36A2EB', '#DC3545', '#FFCE56', '#4BC0C0', '#FF6384', '#9966FF', '#FF9F40', '#FF6B6B', '#4ECDC4', '#45B7D1'];
            const newColor = defaultColors[chartData.length % defaultColors.length];
            setAttributes({ chartColors: [...chartColors, newColor] });
        }

        // For bar/line charts, also update all datasets to include the new data point
        if ((chartType === 'bar' || chartType === 'line') && chartDatasets.length > 0) {
            const updatedDatasets = chartDatasets.map(dataset => ({
                ...dataset,
                data: [...(dataset.data || []), 0] // Add 0 as default value for new data point
            }));
            setAttributes({ chartDatasets: updatedDatasets });
        }
    }

    // Remove data item
    function removeDataItem(index) {
        if (chartData.length > 1) {
            const newData = chartData.filter((_, i) => i !== index);
            setAttributes({ chartData: newData });

            // For pie/doughnut charts, also remove the corresponding color
            if (chartType === 'pie' || chartType === 'doughnut') {
                const newColors = chartColors.filter((_, i) => i !== index);
                setAttributes({ chartColors: newColors });
            }

            // For bar/line charts, also remove the corresponding data point from all datasets
            if ((chartType === 'bar' || chartType === 'line') && chartDatasets.length > 0) {
                const updatedDatasets = chartDatasets.map(dataset => ({
                    ...dataset,
                    data: (dataset.data || []).filter((_, i) => i !== index)
                }));
                setAttributes({ chartDatasets: updatedDatasets });
            }
        }
    }

    // Update data item
    function updateDataItem(index, field, value) {
        const newData = [...chartData];
        newData[index] = { ...newData[index], [field]: field === 'value' ? parseFloat(value) || 0 : value };
        setAttributes({ chartData: newData });
    }

    // Update chart color
    function updateChartColor(index, color) {
        const newColors = [...chartColors];
        newColors[index] = color;
        setAttributes({ chartColors: newColors });
    }

    // Dataset management functions
    function updateDataset(datasetIndex, field, value) {
        const newDatasets = [...chartDatasets];
        newDatasets[datasetIndex] = { ...newDatasets[datasetIndex], [field]: value };
        setAttributes({ chartDatasets: newDatasets });
    }

    function updateDatasetValue(datasetIndex, valueIndex, value) {
        const newDatasets = [...chartDatasets];
        const newData = [...newDatasets[datasetIndex].data];
        newData[valueIndex] = value;
        newDatasets[datasetIndex] = { ...newDatasets[datasetIndex], data: newData };
        setAttributes({ chartDatasets: newDatasets });
    }

    function addDataset() {
        const newDataset = {
            label: `Dataset ${chartDatasets.length + 1}`,
            data: chartData.map(() => 0) // Create data array with 0s matching the number of labels
        };
        setAttributes({ chartDatasets: [...chartDatasets, newDataset] });
    }

    function removeDataset(datasetIndex) {
        if (chartDatasets.length > 1) {
            const newDatasets = chartDatasets.filter((_, index) => index !== datasetIndex);
            setAttributes({ chartDatasets: newDatasets });
        }
    }

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Chart Settings', 'nasio-blocks')}>
                    <SelectControl
                        label={__('Chart Type', 'nasio-blocks')}
                        value={chartType}
                        options={[
                            { label: __('Pie Chart', 'nasio-blocks'), value: 'pie' },
                            { label: __('Doughnut Chart', 'nasio-blocks'), value: 'doughnut' },
                            { label: __('Bar Chart', 'nasio-blocks'), value: 'bar' },
                            { label: __('Line Chart', 'nasio-blocks'), value: 'line' },
                        ]}
                        onChange={(value) => {
                            const updates = { chartType: value };
                            
                            if (value === 'bar' || value === 'line') {
                                // Initialize chartDatasets for bar/line charts if empty
                                if (chartDatasets.length === 0) {
                                    // If chartData is also empty, create some sample data
                                    if (chartData.length === 0) {
                                        updates.chartData = [
                                            { label: "Item 1", value: 64 },
                                            { label: "Item 2", value: 6 },
                                            { label: "Item 3", value: 3.6 },
                                            { label: "Item 4", value: 27.5 }
                                        ];
                                        updates.chartDatasets = [{
                                            label: "Dataset 1",
                                            data: [64, 6, 3.6, 27.5]
                                        }];
                                    } else {
                                        // Create a dataset from existing chartData values
                                        updates.chartDatasets = [{
                                            label: "Dataset 1",
                                            data: chartData.map(item => item.value)
                                        }];
                                    }
                                }
                            } else if (value === 'pie' || value === 'doughnut') {
                                // For pie/doughnut, ensure we have chartData but clear datasets
                                if (chartData.length === 0) {
                                    updates.chartData = [
                                        { label: "Item 1", value: 64 },
                                        { label: "Item 2", value: 6 },
                                        { label: "Item 3", value: 3.6 },
                                        { label: "Item 4", value: 27.5 }
                                    ];
                                }
                                // Clear datasets for pie/doughnut since we don't use them
                                updates.chartDatasets = [];
                            }
                            
                            setAttributes(updates);
                        }}
                        help={__('Choose the type of chart to display.', 'nasio-blocks')}
                    />

                    <TextControl
                        label={__('Chart Title', 'nasio-blocks')}
                        value={chartTitle}
                        onChange={(value) => setAttributes({ chartTitle: value })}
                        placeholder={__('Enter chart title...', 'nasio-blocks')}
                    />

                    <ToggleControl
                        label={__('Show Legend', 'nasio-blocks')}
                        checked={showLegend}
                        onChange={() => setAttributes({ showLegend: !showLegend })}
                    />

                    {showLegend && (
                        <SelectControl
                            label={__('Legend Position', 'nasio-blocks')}
                            value={legendPosition}
                            options={[
                                { label: __('Top', 'nasio-blocks'), value: 'top' },
                                { label: __('Bottom', 'nasio-blocks'), value: 'bottom' },
                                { label: __('Left', 'nasio-blocks'), value: 'left' },
                                { label: __('Right', 'nasio-blocks'), value: 'right' },
                            ]}
                            onChange={(value) => setAttributes({ legendPosition: value })}
                        />
                    )}

                    {(chartType === 'pie' || chartType === 'doughnut') && (
                        <ToggleControl
                            label={__('Show Labels', 'nasio-blocks')}
                            checked={showDataLabels}
                            onChange={() => setAttributes({ showDataLabels: !showDataLabels })}
                            help={__('Display data values on the chart segments.', 'nasio-blocks')}
                        />
                    )}

                    {(chartType === 'pie' || chartType === 'doughnut') && showDataLabels && (
                        <InputControl
                            label={__('Label Threshold', 'nasio-blocks')}
                            type="number"
                            value={labelThreshold !== undefined ? labelThreshold : ''}
                            onChange={(value) => {
                                // Handle empty string
                                if (value === '' || value === null || value === undefined) {
                                    setAttributes({ labelThreshold: undefined });
                                    return;
                                }
                                
                                // Convert to number and validate
                                const numValue = parseFloat(value);
                                if (!isNaN(numValue)) {
                                    setAttributes({ labelThreshold: numValue });
                                }
                            }}
                            help={__('Hide labels for values below this threshold.', 'nasio-blocks')}
                            step="any"
                        />
                    )}

                    <RangeControl
                        label={__('Chart Width (px)', 'nasio-blocks')}
                        value={chartWidth}
                        onChange={(value) => setAttributes({ chartWidth: value })}
                        min={200}
                        max={800}
                        step={10}
                    />

                    <RangeControl
                        label={__('Chart Height (px)', 'nasio-blocks')}
                        value={chartHeight}
                        onChange={(value) => setAttributes({ chartHeight: value })}
                        min={200}
                        max={600}
                        step={10}
                    />

                    <RangeControl
                        label={__('Border Width (px)', 'nasio-blocks')}
                        value={borderWidth}
                        onChange={(value) => setAttributes({ borderWidth: value })}
                        min={0}
                        max={10}
                        step={1}
                    />

                    <TextControl
                        label={__('Data Unit', 'nasio-blocks')}
                        value={dataUnit}
                        onChange={(value) => setAttributes({ dataUnit: value })}
                        help={__('Unit or symbol to display after data values (e.g., %, $, km/h, etc.).', 'nasio-blocks')}
                    />

                    {dataUnit && (
                        <SelectControl
                            label={__('Unit Position', 'nasio-blocks')}
                            value={unitPosition}
                            options={[
                                { label: __('After Value', 'nasio-blocks'), value: 'after' },
                                { label: __('Before Value', 'nasio-blocks'), value: 'before' },
                            ]}
                            onChange={(value) => setAttributes({ unitPosition: value })}
                            help={__('Choose whether the unit appears before or after the data value.', 'nasio-blocks')}
                        />
                    )}
                </PanelBody>

                <PanelBody title={__('Chart Data', 'nasio-blocks')} initialOpen={true}>
                    {(chartType === 'pie' || chartType === 'doughnut') && (
                        <>
                            <div className="chart-labels-section">
                                <h4>{__('Data Items', 'nasio-blocks')}</h4>
                                {chartData.map((item, index) => (
                                    <div key={index} className="chart-data-item">
                                        <InputControl
                                            label={__('Label', 'nasio-blocks')}
                                            value={item.label}
                                            onChange={(value) => updateDataItem(index, 'label', value)}
                                            className="data-item-controls"
                                        />
                                        <InputControl
                                            label={__('Value', 'nasio-blocks')}
                                            type="number"
                                            value={item.value}
                                            onChange={(value) => updateDataItem(index, 'value', value)}
                                            className="data-item-controls"
                                        />
                                        {chartData.length > 1 && (
                                            <Button
                                                variant="secondary"
                                                isDestructive
                                                onClick={() => removeDataItem(index)}
                                                className="data-item-remove"
                                            >
                                                {__('Remove Item', 'nasio-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    variant="primary"
                                    onClick={addDataItem}
                                    className="add-data-btn"
                                >
                                    {__('Add Data Item', 'nasio-blocks')}
                                </Button>
                            </div>
                        </>
                    )}

                    {(chartType === 'bar' || chartType === 'line') && (
                        <>
                            <div className="chart-labels-section">
                                <h4>{__('Labels', 'nasio-blocks')}</h4>
                                {chartData.map((item, index) => (
                                    <div key={index} className="label-item">
                                        <InputControl
                                            label={`${__('Label', 'nasio-blocks')} ${index + 1}`}
                                            value={item.label}
                                            onChange={(value) => updateDataItem(index, 'label', value)}
                                            className="label-input"
                                        />
                                        {chartData.length > 1 && (
                                            <Button
                                                variant="secondary"
                                                isDestructive
                                                onClick={() => removeDataItem(index)}
                                                className="label-remove"
                                            >
                                                {__('Remove', 'nasio-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    variant="secondary"
                                    onClick={addDataItem}
                                    className="add-label-btn"
                                >
                                    {__('Add Label', 'nasio-blocks')}
                                </Button>
                            </div>

                            <h4>{__('Datasets', 'nasio-blocks')}</h4>
                            {chartDatasets.map((dataset, datasetIndex) => (
                                <div key={datasetIndex} className="chart-dataset">
                                    <InputControl
                                        label={__('Dataset Label', 'nasio-blocks')}
                                        value={dataset.label}
                                        onChange={(value) => updateDataset(datasetIndex, 'label', value)}
                                        className="dataset-label"
                                    />
                                    
                                    <h5>{__('Values', 'nasio-blocks')}</h5>
                                    <div className="dataset-values">
                                        {chartData.map((item, valueIndex) => (
                                            <InputControl
                                                key={valueIndex}
                                                label={item.label}
                                                type="number"
                                                value={dataset.data[valueIndex] || 0}
                                                onChange={(value) => updateDatasetValue(datasetIndex, valueIndex, parseFloat(value) || 0)}
                                            />
                                        ))}
                                    </div>
                                    
                                    {chartDatasets.length > 1 && (
                                        <Button
                                            variant="secondary"
                                            isDestructive
                                            onClick={() => removeDataset(datasetIndex)}
                                            className="dataset-remove"
                                        >
                                            {__('Remove Dataset', 'nasio-blocks')}
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                variant="secondary"
                                onClick={addDataset}
                                className="add-dataset-btn"
                            >
                                {__('Add Dataset', 'nasio-blocks')}
                            </Button>
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                {(chartType === 'pie' || chartType === 'doughnut') && (
                    <PanelColorSettings
                        title={__('Chart Colors', 'nasio-blocks')}
                        colorSettings={chartData.map((item, index) => ({
                            value: chartColors[index] || '#000000',
                            onChange: (color) => updateChartColor(index, color || '#000000'),
                            label: `${item.label} ${__('Color', 'nasio-blocks')}`,
                            disableCustomColors: false,
                            clearable: false,
                        }))}
                    />
                )}

                {(chartType === 'bar' || chartType === 'line') && (
                    <PanelColorSettings
                        title={__('Dataset Colors', 'nasio-blocks')}
                        colorSettings={chartDatasets.map((dataset, datasetIndex) => ({
                            value: chartColors[datasetIndex] || '#36A2EB',
                            onChange: (color) => updateChartColor(datasetIndex, color || '#36A2EB'),
                            label: `${dataset.label} ${__('Color', 'nasio-blocks')}`,
                            disableCustomColors: false,
                            clearable: false,
                        }))}
                    />
                )}

                <PanelColorSettings
                    title={__('Background & Border', 'nasio-blocks')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Background Color', 'nasio-blocks'),
                            disableCustomColors: false,
                            clearable: true,
                        },
                        {
                            value: borderColor,
                            onChange: (color) => setAttributes({ borderColor: color }),
                            label: __('Border Color', 'nasio-blocks'),
                            disableCustomColors: false,
                            clearable: true,
                        },
                    ]}
                />
            </InspectorControls>

            <div className="chart-editor-wrapper">
                <h3 className="chart-editor-title">
                    {__('Chart Preview', 'nasio-blocks')}
                </h3>
                
                <div 
                    className="chart-container"
                    style={{ 
                        backgroundColor: backgroundColor || undefined,
                        border: borderColor ? `${borderWidth}px solid ${borderColor}` : undefined
                    }}
                >
                    {!isChartJSLoaded ? (
                        <div className="chart-loading">
                            {__('Loading Chart.js...', 'nasio-blocks')}
                        </div>
                    ) : (
                        <canvas ref={canvasRef} />
                    )}
                </div>
            </div>
        </div>
    );
}
