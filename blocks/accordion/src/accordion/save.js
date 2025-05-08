/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function for the accordion block.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const { defaultOpenItem, headerBackgroundColor, headerTextColor } = attributes;

    const style = {};
    if (headerBackgroundColor) {
        style['--nasio-blocks-accordion-header-bgr-color'] = headerBackgroundColor;
    }
    if (headerTextColor) {
        style['--nasio-blocks-accordion-header-text-color'] = headerTextColor;
    }

    const blockProps = useBlockProps.save({
        className: 'nasio-accordion',
        'data-default-open': defaultOpenItem || '',
        style: style
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}