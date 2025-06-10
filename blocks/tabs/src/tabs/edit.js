/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks, PanelColorSettings, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Edit function for the Tabs block
 */
export default function Edit({ attributes, setAttributes, clientId }) {
    const { defaultActiveTab, activeTabId, tabHeaderBackgroundColor, tabHeaderTextColor, tabHeaderActiveBackgroundColor, tabHeaderActiveTextColor } = attributes;
    const [localActiveTabId, setLocalActiveTabId] = useState(null);

    const { selectBlock } = useDispatch('core/block-editor');
    const { updateBlockAttributes } = useDispatch('core/block-editor');
    
    // Get currently selected block
    const selectedBlockId = useSelect((select) => {
        return select('core/block-editor').getSelectedBlockClientId();
    }, []);

    // Get all tab blocks within this parent
    const tabItems = useSelect((select) => {
        const { getBlock } = select('core/block-editor');
        const block = getBlock(clientId);
        return block?.innerBlocks || [];
    }, [clientId]);

    // Set active tab based on selection or default
    useEffect(() => {
        if (tabItems.length > 0) {
            // Check if selected block is one of our tabs or a child of our tabs
            const selectedTab = tabItems.find(item => {
                if (item.clientId === selectedBlockId) return true;
                // Check if selected block is a descendant of this tab
                const checkDescendants = (block) => {
                    if (block.clientId === selectedBlockId) return true;
                    return block.innerBlocks?.some(checkDescendants) || false;
                };
                return checkDescendants(item);
            });
            
            if (selectedTab) {
                const newActiveId = selectedTab.clientId;
                setLocalActiveTabId(newActiveId);
                setAttributes({ activeTabId: newActiveId });
            } else if (!localActiveTabId && tabItems.length > 0) {
                // Set default active tab - always use first tab if no default specified
                const defaultTab = tabItems.find(item => item.attributes.blockId === defaultActiveTab);
                const newActiveId = defaultTab ? defaultTab.clientId : tabItems[0].clientId;
                setLocalActiveTabId(newActiveId);
                setAttributes({ activeTabId: newActiveId });
                
                // Also set the default in attributes if not already set
                if (!defaultActiveTab && tabItems[0].attributes.blockId) {
                    setAttributes({ defaultActiveTab: tabItems[0].attributes.blockId });
                }
            }
        }
    }, [tabItems, selectedBlockId, defaultActiveTab, localActiveTabId]);

    // Handle tab switching
    const handleTabClick = (tabClientId) => {
        setLocalActiveTabId(tabClientId);
        setAttributes({ activeTabId: tabClientId });
        selectBlock(tabClientId);
    };

    // Create options for defaultActiveTab selector
    const tabOptions = [
        ...tabItems.map((item, index) => ({
            label: item.attributes.title || __('Tab ', 'nasio-blocks') + (index + 1),
            value: item.attributes.blockId || item.clientId
        }))
    ];

    // Block template for initial items
    const TEMPLATE = [
        ['nasio-block/tab', { title: __('Tab 1', 'nasio-blocks') }],
        ['nasio-block/tab', { title: __('Tab 2', 'nasio-blocks') }],
        ['nasio-block/tab', { title: __('Tab 3', 'nasio-blocks') }],
    ];

    const blockProps = useBlockProps({
        className: 'nasio-tabs',
        style: {
            '--tabs-bg-color': tabHeaderBackgroundColor || 'transparent',
            '--tabs-text-color': tabHeaderTextColor || 'inherit',
            '--tabs-active-bg-color': tabHeaderActiveBackgroundColor || '#0073aa',
            '--tabs-active-text-color': tabHeaderActiveTextColor || '#ffffff',
        }
    });

    return (
        <div {...blockProps}>
            <InspectorControls group="settings">
                <PanelBody title={__('Tabs Settings', 'nasio-blocks')}>
                    <SelectControl
                        label={__('Default Active Tab', 'nasio-blocks')}
                        value={defaultActiveTab}
                        options={tabOptions}
                        onChange={(value) => setAttributes({ defaultActiveTab: value })}
                        help={__('Select which tab should be active by default. The first tab will be active if no selection is made.', 'nasio-blocks')}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelColorSettings 
                    title={__('Color', 'nasio-blocks')}
                    initialOpen={true}
                    colorSettings={[
                        {
                            value: tabHeaderBackgroundColor,
                            onChange: (value) => setAttributes({ tabHeaderBackgroundColor: value }),
                            label: __('Tab Title Background', 'nasio-blocks'),
                        },
                        {
                            value: tabHeaderTextColor,
                            onChange: (value) => setAttributes({ tabHeaderTextColor: value }),
                            label: __('Tab Title Text', 'nasio-blocks'),
                        },
                        {
                            value: tabHeaderActiveBackgroundColor,
                            onChange: (value) => setAttributes({ tabHeaderActiveBackgroundColor: value }),
                            label: __('Active Tab Title Background', 'nasio-blocks'),
                        },
                        {
                            value: tabHeaderActiveTextColor,
                            onChange: (value) => setAttributes({ tabHeaderActiveTextColor: value }),
                            label: __('Active Tab Title Text', 'nasio-blocks'),
                        }
                    ]}
                />
            </InspectorControls>
            
            {/* Tab Navigation */}
            {tabItems.length > 0 && (
                <div className="nasio-tabs-nav">
                    {tabItems.map((item, index) => (
                        <div
                            key={item.clientId}
                            className={`nasio-tab-nav-button ${localActiveTabId === item.clientId ? 'is-active' : ''}`}
                            onClick={() => handleTabClick(item.clientId)}
                        >
                            <RichText
                                tagName="span"
                                value={item.attributes.title || __('Tab ', 'nasio-blocks') + (index + 1)}
                                onChange={(newTitle) => {
                                    // Update the tab block's title attribute
                                    updateBlockAttributes(item.clientId, { title: newTitle });
                                }}
                                placeholder={__('Tab Title', 'nasio-blocks')}
                                allowedFormats={[]}
                                withoutInteractiveFormatting
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent parent div click
                                    // Switch to this tab first
                                    handleTabClick(item.clientId);
                                    // Then focus the RichText for editing after a small delay
                                    setTimeout(() => {
                                        e.target.focus();
                                    }, 10);
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
            
            <InnerBlocks 
                template={TEMPLATE}
                allowedBlocks={['nasio-block/tab']}
                renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
            />
        </div>
    );
}
