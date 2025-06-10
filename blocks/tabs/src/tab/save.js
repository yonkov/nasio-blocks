/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function for the tab block.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const { title, blockId } = attributes;

    const blockProps = useBlockProps.save({
        className: 'nasio-tab',
        'data-block-id': blockId || ''
    });

    return (
        <div {...blockProps}>
            <div className="nasio-tab-header">
                <h3 className="nasio-tab-title">{title}</h3>
            </div>
            <div className="nasio-tab-content">
                <div className="nasio-tab-content-inner">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}
