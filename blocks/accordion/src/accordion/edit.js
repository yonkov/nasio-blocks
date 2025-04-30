/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Edit function for the Accordion block
 */
export default function Edit({ attributes, setAttributes, clientId }) {
    const { defaultOpenItem } = attributes;

    // Get all accordion item blocks within this parent
    const accordionItems = useSelect((select) => {
        const { getBlocks } = select('core/block-editor');
        return getBlocks(clientId);
    }, [clientId]);

    // Update defaultOpenItem if the selected block no longer exists
    useEffect(() => {
        if (defaultOpenItem && !accordionItems.find(item => item.clientId === defaultOpenItem)) {
            setAttributes({ defaultOpenItem: '' });
        }
    }, [accordionItems, defaultOpenItem, setAttributes]);

    // Create options for defaultOpenItem selector
    const itemOptions = [
        { label: __('None (all collapsed)', 'nasio-blocks'), value: '' },
        ...accordionItems.map((item, index) => ({
            label: item.attributes.title || __('Accordion Item ', 'nasio-blocks') + (index + 1),
            value: item.clientId
        }))
    ];

    // Block template for initial items
    const TEMPLATE = [
        ['nasio-block/accordion-item', { title: __('Accordion Item 1', 'nasio-blocks') }],
        ['nasio-block/accordion-item', { title: __('Accordion Item 2', 'nasio-blocks') }],
        ['nasio-block/accordion-item', { title: __('Accordion Item 3', 'nasio-blocks') }],
    ];

    const blockProps = useBlockProps({
        className: 'nasio-accordion'
    });

    return (
        <div {...blockProps}>
            <InspectorControls>
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
            <InnerBlocks 
                template={TEMPLATE}
                allowedBlocks={['nasio-block/accordion-item']}
            />
        </div>
    );
}