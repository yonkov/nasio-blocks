/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The edit function for the slide block.
 *
 * @param {Object} props               Block props.
 * @param {Object} props.attributes    Block attributes.
 * @param {string} props.clientId      Block client ID.
 * @return {WPElement} Element to render.
 */
export default function SlideEdit({ attributes, clientId }) {
    const { className } = attributes;
    const blockProps = useBlockProps({
        className: `${className ? className : ''} swiper-slide nasio-slide`,
    });

    // Setup inner blocks with required templates
    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            template: [
                ['core/cover', {
                    customOverlayColor: '#000000',
                    dimRatio: 40,
                    isDark: true,
                }, [
                    ['core/heading', { 
                        placeholder: 'Add slide title...', 
                        textColor: 'white', 
                        level: 2 
                    }]
                ]]
            ],
            templateLock: false,
            allowedBlocks: ['core/cover'],
        }
    );

    return <div {...blockProps}>{innerBlocksProps.children}</div>;
}