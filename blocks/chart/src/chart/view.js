/**
 * Frontend script for Chart block
 */

// Initialize a single chart
function initChart(chartContainer) {
    const canvas = chartContainer.querySelector('.nasio-chart-canvas');
    if (!canvas) return;

    const chartType = chartContainer.dataset.chartType || 'pie';
    const chartData = JSON.parse(chartContainer.dataset.chartData || '[]');
    const chartDatasets = JSON.parse(chartContainer.dataset.chartDatasets || '[]');
    const chartColors = JSON.parse(chartContainer.dataset.chartColors || '[]');
    const chartTitle = chartContainer.dataset.chartTitle || '';
    const showLegend = chartContainer.dataset.showLegend === 'true';
    const legendPosition = chartContainer.dataset.legendPosition || 'top';
    const chartWidth = parseInt(chartContainer.dataset.chartWidth) || 440;
    const chartHeight = parseInt(chartContainer.dataset.chartHeight) || 330;
    const backgroundColor = chartContainer.dataset.backgroundColor || '';
    const borderColor = chartContainer.dataset.borderColor || '';
    const borderWidth = parseInt(chartContainer.dataset.borderWidth) || 1;
    const showDataLabels = chartContainer.dataset.showDataLabels === 'true';
    const dataUnit = chartContainer.dataset.dataUnit || '';
    const unitPosition = chartContainer.dataset.unitPosition || 'after';
    const labelThreshold = chartContainer.dataset.labelThreshold === '' ? 0 : (isNaN(parseFloat(chartContainer.dataset.labelThreshold)) ? 0 : parseFloat(chartContainer.dataset.labelThreshold));

    // Apply container styles
    const containerElement = canvas.parentElement;
    if (containerElement) {
        // Only apply fixed dimensions on larger screens (40rem = 640px)
        const isLargeScreen = window.innerWidth >= 640;
        
        if (isLargeScreen) {
            containerElement.style.width = `${chartWidth}px`;
            containerElement.style.height = `${chartHeight}px`;
        } else {
            containerElement.style.width = '';
            containerElement.style.height = '';
        }
        
        // Apply background color to container if not already set
        if (backgroundColor && !containerElement.style.backgroundColor) {
            containerElement.style.backgroundColor = backgroundColor;
        }
        
        // Apply border color to container if specified and not already set
        if (borderColor && !containerElement.style.border) {
            containerElement.style.border = `${borderWidth}px solid ${borderColor}`;
        }
    }



    // Configure datasets based on chart type
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

    // Early return if no data
    if (chartData.length === 0 && chartDatasets.length === 0) {
        // Create empty chart with message
        config.data.labels = [];
        config.data.datasets = [];
        try {
            new window.Chart(canvas, config);
        } catch (error) {
            console.error('Error creating chart:', error);
        }
        return;
    }

    // Configure datasets based on chart type
    if (chartType === 'line' || chartType === 'bar') {
        // Use multiple datasets for bar and line charts
        if (chartDatasets.length > 0) {
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
        } else {
            // Fallback for when no datasets are defined: create one from chartData
            const datasetColor = chartColors[0] || '#36A2EB';
            config.data.datasets = [{
                label: chartTitle || 'Dataset',
                data: chartData.map(item => item.value),
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
            }];
        }
        
        config.options.scales = {
            y: {
                beginAtZero: chartType === 'bar',
                ticks: {
                    callback: function(value) {
                        const unit = dataUnit || '';
                        return unitPosition === 'before' ? unit + value : value + unit;
                    }
                }
            }
        };
    } else {
        // Use single dataset for pie and doughnut charts
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
                    ctx.fillStyle = '#fff';
                    
                    // For pie/doughnut charts, we only have one dataset
                    const dataset = chart.data.datasets[0];
                    const meta = chart.getDatasetMeta(0);
                    
                    meta.data.forEach((element, index) => {
                        if (!element.circumference || element.circumference === 0) return; // Skip hidden segments
                        
                        const data = dataset.data[index];
                        
                        // Skip if data is below threshold
                        if (data < labelThreshold) return;
                        
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

    // Create the chart
    try {
        new window.Chart(canvas, config);
    } catch (error) {
        console.error('Error creating chart:', error);
    }
}

// Initialize all charts on the page
function initializeCharts() {
    const chartContainers = document.querySelectorAll('.wp-block-nasio-block-chart');
    
    if (!chartContainers.length) return;
    
    if (typeof window.Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        return;
    }

    chartContainers.forEach(initChart);
}

// Handle responsive behavior on window resize
function handleResize() {
    const chartContainers = document.querySelectorAll('.wp-block-nasio-block-chart');
    
    chartContainers.forEach(chartContainer => {
        const canvas = chartContainer.querySelector('.nasio-chart-canvas');
        if (!canvas) return;
        
        const containerElement = canvas.parentElement;
        if (!containerElement) return;
        
        const chartWidth = parseInt(chartContainer.dataset.chartWidth) || 400;
        const chartHeight = parseInt(chartContainer.dataset.chartHeight) || 300;
        const isLargeScreen = window.innerWidth >= 640;
        
        if (isLargeScreen) {
            containerElement.style.width = `${chartWidth}px`;
            containerElement.style.height = `${chartHeight}px`;
        } else {
            containerElement.style.width = '';
            containerElement.style.height = '';
        }
    });
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

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    window.addEventListener('resize', debounce(handleResize, 150));
});
