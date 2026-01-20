/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { Icon, chevronDown } from '@wordpress/icons';

/**
 * The save function for the accordion item block.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const { title, blockId } = attributes;

    const blockProps = useBlockProps.save({
        className: 'nasio-accordion-item',
        'data-block-id': blockId || ''
    });

    return (
        <div {...blockProps}>
            <button 
                className="nasio-accordion-item-header"
                type="button"
                aria-expanded="false"
            >
                <RichText.Content 
                    tagName="h3" 
                    className="nasio-accordion-item-title" 
                    value={title} 
                />
                <Icon 
                    icon={chevronDown} 
                    className="nasio-accordion-icon"
                    aria-hidden="true"
                />
            </button>
            <div className="nasio-accordion-item-content">
                <div className="nasio-accordion-item-content-inner">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}