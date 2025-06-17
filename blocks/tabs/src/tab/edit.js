/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Edit function for the Tab block
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
    const { title, blockId } = attributes;
    const { 'nasio-block/defaultActiveTab': defaultActiveTab, 'nasio-block/activeTabId': activeTabId } = context;

    // Check if this tab is the active one
    const isActiveTab = activeTabId === clientId;

    // Get all tab blocks from the parent to check for duplicates
    const parentTabBlocks = useSelect((select) => {
        const { getBlockParents, getBlocks } = select('core/block-editor');
        const parents = getBlockParents(clientId);
        const parentId = parents[parents.length - 1];
        if (parentId) {
            const parentBlock = select('core/block-editor').getBlock(parentId);
            return parentBlock?.innerBlocks?.filter(block => block.name === 'nasio-block/tab') || [];
        }
        return [];
    }, [clientId]);

    // Set blockId on mount or detect duplicates and fix them
    useEffect(() => {
        const needsNewId = !blockId || 
            parentTabBlocks.filter(tab => tab.attributes.blockId === blockId).length > 1;
        
        if (needsNewId) {
            // Generate a unique blockId using clientId (which is always unique)
            setAttributes({ blockId: clientId });
        }
    }, [blockId, clientId, setAttributes, parentTabBlocks]);
    
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
