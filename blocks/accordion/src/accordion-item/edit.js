/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { Icon, chevronDown } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';

/**
 * Edit function for the Accordion Item block
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
    const { title, blockId } = attributes;
    const { 'nasio-block/defaultOpenItem': defaultOpenItem } = context;

    // Set blockId on mount if not already set
    useEffect(() => {
        if (!blockId) {
            setAttributes({ blockId: clientId });
        }
    }, [blockId, clientId, setAttributes]);

    // Check if this item should be open by default
    const isDefaultOpen = defaultOpenItem === clientId;
    
    // The accordion item class
    const accordionItemClass = `nasio-accordion-item ${isDefaultOpen ? 'is-open' : ''}`;
    
    return (
        <div {...useBlockProps({
            className: accordionItemClass,
        })}>
            <div className="nasio-accordion-item-header">
                <RichText
                    tagName="h3"
                    className="nasio-accordion-item-title"
                    value={title}
                    onChange={(newTitle) => setAttributes({ title: newTitle })}
                    placeholder={__('Accordion Item Title', 'nasio-blocks')}
                />
                <Icon 
                    icon={chevronDown} 
                    className="nasio-accordion-icon" 
                />
            </div>
            <div className="nasio-accordion-item-content">
                <div className="nasio-accordion-item-content-inner">
                    <InnerBlocks 
                        template={[['core/paragraph', { placeholder: __('Add content here...', 'nasio-blocks') }]]}
                        templateLock={false}
                    />
                </div>
            </div>
        </div>
    );
}