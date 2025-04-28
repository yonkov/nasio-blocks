/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function for the slide block.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        className: 'nasio-slide swiper-slide',
    });

    return (
        <div {...blockProps}>
            <div className="nasio-slide-inner">
                <InnerBlocks.Content />
            </div>
        </div>
    );
} 