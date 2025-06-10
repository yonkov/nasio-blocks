/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function for the tabs block.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const { defaultActiveTab, tabHeaderBackgroundColor, tabHeaderTextColor, tabHeaderActiveBackgroundColor, tabHeaderActiveTextColor } = attributes;

    const blockProps = useBlockProps.save({
        className: 'nasio-tabs',
        'data-default-active': defaultActiveTab || '',
        style: {
            '--tabs-bg-color': tabHeaderBackgroundColor || '#f7f7f7',
            '--tabs-text-color': tabHeaderTextColor || 'inherit',
            '--tabs-active-bg-color': tabHeaderActiveBackgroundColor || '#0073aa',
            '--tabs-active-text-color': tabHeaderActiveTextColor || '#ffffff',
        }
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}
