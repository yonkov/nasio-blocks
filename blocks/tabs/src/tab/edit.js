/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

/**
 * Edit function for the Tab block
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
    const { title, blockId } = attributes;
    const { 'nasio-block/defaultActiveTab': defaultActiveTab, 'nasio-block/activeTabId': activeTabId } = context;

    // Check if this tab is the active one
    const isActiveTab = activeTabId === clientId;

    // Set blockId on mount if not already set
    useEffect(() => {
        if (!blockId) {
            setAttributes({ blockId: clientId });
        }
    }, [blockId, clientId, setAttributes]);
    
    return (
        <div {...useBlockProps({
            className: `nasio-tab ${isActiveTab ? 'is-active' : ''}`,
            style: {
                display: isActiveTab ? 'block' : 'none'
            }
        })}>
            <div className="nasio-tab-header" style={{ 
                display: 'none' // Hidden in editor since title editing happens in navigation
            }}>
                <RichText
                    tagName="h3"
                    className="nasio-tab-title"
                    value={title}
                    onChange={(newTitle) => setAttributes({ title: newTitle })}
                    placeholder={__('Tab Title', 'nasio-blocks')}
                />
            </div>
            <div className="nasio-tab-content">
                <div className="nasio-tab-content-inner">
                    <InnerBlocks 
                        template={[['core/paragraph', { placeholder: __('Add tab content here...', 'nasio-blocks') }]]}
                        templateLock={false}
                    />
                </div>
            </div>
        </div>
    );
}
