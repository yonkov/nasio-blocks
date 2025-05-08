/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Edit function for the Accordion block
 */
export default function Edit({ attributes, setAttributes, clientId }) {
    const { defaultOpenItem, headerBackgroundColor, headerTextColor } = attributes;

    // Get all accordion item blocks within this parent
    const accordionItems = useSelect((select) => {
        const { getBlock } = select('core/block-editor');
        const block = getBlock(clientId);
        return block?.innerBlocks || [];
    }, [clientId]);

    // Create options for defaultOpenItem selector
    const itemOptions = [
        { label: __('None', 'nasio-blocks'), value: '' },
        ...accordionItems.map((item, index) => ({
            label: item.attributes.title || __('Accordion Item ', 'nasio-blocks') + (index + 1),
            value: item.attributes.blockId
        }))
    ];

    // Block template for initial items
    const TEMPLATE = [
        ['nasio-block/accordion-item', { title: __('Accordion Item 1', 'nasio-blocks') }],
        ['nasio-block/accordion-item', { title: __('Accordion Item 2', 'nasio-blocks') }],
        ['nasio-block/accordion-item', { title: __('Accordion Item 3', 'nasio-blocks') }],
    ];

    const editorStyles = {};
    if (headerBackgroundColor) {
        editorStyles['--nasio-blocks-accordion-header-bgr-color'] = headerBackgroundColor;
    }
    if (headerTextColor) {
        editorStyles['--nasio-blocks-accordion-header-text-color'] = headerTextColor;
    }

    const blockProps = useBlockProps({
        className: 'nasio-accordion',
        style: editorStyles
    });

    return (
        <div {...blockProps}>
            <InspectorControls group="settings">
                <PanelBody title={__('Accordion Settings', 'nasio-blocks')}>
                    <SelectControl
                        label={__('Default Open Item', 'nasio-blocks')}
                        value={defaultOpenItem}
                        options={itemOptions}
                        onChange={(value) => setAttributes({ defaultOpenItem: value })}
                        help={__('Select which item should be open by default. Choose "None" to have all items collapsed initially.', 'nasio-blocks')}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelColorSettings 
                    title={__('Color', 'nasio-blocks')}
                    initialOpen={true}
                    colorSettings={[
                        {
                            value: headerBackgroundColor,
                            onChange: (value) => setAttributes({ headerBackgroundColor: value }),
                            label: __('Header Background', 'nasio-blocks'),
                        },
                        {
                            value: headerTextColor,
                            onChange: (value) => setAttributes({ headerTextColor: value }),
                            label: __('Header Text', 'nasio-blocks'),
                        }
                    ]}
                />
            </InspectorControls>
            <InnerBlocks 
                template={TEMPLATE}
                allowedBlocks={['nasio-block/accordion-item']}
            />
        </div>
    );
}