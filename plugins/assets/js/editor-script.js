const { createElement, useState, useEffect, Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const { Modal, Button, Spinner } = wp.components;
const { dispatch, useSelect, subscribe } = wp.data;
const { __ } = wp.i18n;
const { BlockPreview } = wp.blockEditor; // Import BlockPreview

// Displays a modal with patterns
const NasioPatternsModalView = ({ isOpen, setOpen }) => {
	const fetchedPatterns = useSelect((select) => {
		if (!isOpen) {
			return null;
		}
		const allCorePatterns = select('core').getBlockPatterns();
		return allCorePatterns;
	}, [isOpen]);

	const [displayablePatterns, setDisplayablePatterns] = useState(null);

	useEffect(() => {
		if (isOpen) {
			if (fetchedPatterns === null) {
				setDisplayablePatterns(null);
			} else if (Array.isArray(fetchedPatterns)) {
				const nasioFilteredPatterns = fetchedPatterns.filter(pattern =>
					pattern.categories && pattern.categories.includes('nasio-patterns')
				);
				setDisplayablePatterns(nasioFilteredPatterns);
			} else {
				setDisplayablePatterns([]);
			}
		} else {
			if (displayablePatterns !== null) {
				setDisplayablePatterns(null);
			}
		}
	}, [isOpen, fetchedPatterns]);

	const insertPattern = (content) => {
		const blocks = wp.blocks.parse(content);
		dispatch('core/block-editor').insertBlocks(blocks);
		setOpen(false);
	};

	if (!isOpen) {
		return null;
	}

	return createElement(
		Modal,
		{
			title: __( 'Select a Nasio Pattern', 'nasio-blocks' ),
			onRequestClose: () => { setOpen(false); },
			className: 'nasio-patterns-modal',
			// Adjust modal style if needed, BlockPreview might take more space or behave differently
			style: { width: '80%', maxWidth: '960px', minHeight: '50vh' } 
		},
		displayablePatterns === null && createElement(Spinner),
		displayablePatterns && displayablePatterns.length === 0 && createElement(Spinner),
		displayablePatterns && displayablePatterns.length > 0 &&
			createElement('div', { className: 'nasio-patterns-flex-container' },
				displayablePatterns.map((pattern) => {
					// Convert pattern content string to an array of blocks for BlockPreview
					const patternBlocks = wp.blocks.parse(pattern.content);
					return createElement(
						'div',
						{
							key: pattern.name || pattern.title,
							className: 'nasio-pattern-item-wrapper',
							onClick: (e) => {
								// Prevent double-insert if Insert button is clicked
								if (e.target.closest('button')) return;
								insertPattern(pattern.content);
							},
							style: { cursor: 'pointer' },
						},
						createElement(
							'div',
							{
								className: 'nasio-pattern-item'
							},
							createElement('h4', null, pattern.title),
							createElement('div', {
								className: 'nasio-pattern-item-preview', // Keep this class for sizing the preview area
							},
							// Use BlockPreview component
							patternBlocks && patternBlocks.length > 0 ? 
							createElement(BlockPreview, {
								blocks: patternBlocks,
								viewportWidth: 1200, // Simulate desktop width
								// additionalWrapperProps: { style: { height: '100%' } } // Optional: if you need to force height
							}) : createElement('p', null, 'Error parsing pattern content.')
							),
							createElement(
								Button,
								{
									isPrimary: true,
									style: { marginTop: '15px' },
									onClick: (e) => {
										e.stopPropagation();
										insertPattern(pattern.content);
									},
								},
								__( 'Insert', 'nasio-blocks' )
							)
						)
					);
				})
			)
	);
};

// Manages the custom button in the toolbar and the modal.
const NasioPatternButtonAndModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const customButtonId = 'nasio-custom-pattern-button';
	const targetToolbarSelector = '.editor-document-tools__left';

	useEffect(() => {
		const addCustomButton = () => {
			const toolbar = document.querySelector(targetToolbarSelector);

			if (toolbar && !document.getElementById(customButtonId)) {
				const newButton = document.createElement('button');
				newButton.id = customButtonId;
				newButton.type = 'button';
				// Apply classes similar to other toolbar buttons, adjusted for text
				newButton.classList.add('components-button', 'components-toolbar-button');
				newButton.setAttribute('aria-label', __( 'Insert Nasio Pattern', 'nasio-blocks' ));
				
				newButton.textContent = __( 'Template library', 'nasio-blocks' );

				newButton.onclick = () => {
					setIsModalOpen(true);
				};

				toolbar.appendChild(newButton);
			}
		};

		const unsubscribe = subscribe(() => {
			setTimeout(addCustomButton, 0);
		});
		
		setTimeout(addCustomButton, 500);

		return () => {
			unsubscribe();
			const button = document.getElementById(customButtonId);
			if (button) {
				button.onclick = null;
				button.remove();
			}
		};
	}, []);

	return createElement(
		Fragment,
		null,
		isModalOpen && createElement(NasioPatternsModalView, { isOpen: isModalOpen, setOpen: setIsModalOpen })
	);
};

// Register the plugin.
// The 'render' function is our main component that will handle button injection and modal.
// The 'icon' is for the plugin list if it appears there.
registerPlugin('nasio-pattern-inserter', {
	render: NasioPatternButtonAndModal,
	icon: 'layout',
});