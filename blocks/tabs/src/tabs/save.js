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
        '--tabs-bg-color': tabHeaderBackgroundColor ? tabHeaderBackgroundColor : undefined,
        '--tabs-text-color': tabHeaderTextColor ? tabHeaderTextColor : undefined,
        '--tabs-active-bg-color': tabHeaderActiveBackgroundColor ? tabHeaderActiveBackgroundColor : undefined,
        '--tabs-active-text-color': tabHeaderActiveTextColor ? tabHeaderActiveTextColor : undefined,
        }
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}
