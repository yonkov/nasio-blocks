/**
 * Initialize accordions
 */
document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
});

function initAccordions() {
    const accordions = document.querySelectorAll('.nasio-accordion');

    accordions.forEach(accordion => {
        const defaultOpenItem = accordion.dataset.defaultOpen || '';
        const items = accordion.querySelectorAll('.nasio-accordion-item');

        items.forEach(item => {
            // Initial state setup
            const isDefaultOpen = defaultOpenItem && item.dataset.blockId === defaultOpenItem;
            if (isDefaultOpen) {
                openAccordionItem(item);
            }

            // Add click event listeners to headers
            const header = item.querySelector('.nasio-accordion-item-header');
            if (header) {
                header.addEventListener('click', () => {
                    toggleAccordionItem(item);
                });
            }
        });
    });
}

function toggleAccordionItem(item) {
    const isOpen = item.classList.contains('is-open');
    const content = item.querySelector('.nasio-accordion-item-content');
    
    // Close or open based on current state
    if (isOpen) {
        closeAccordionItem(item);
    } else {
        // Close any other open items in the same accordion first
        const accordion = item.closest('.nasio-accordion');
        if (accordion) {
            const openItems = accordion.querySelectorAll('.nasio-accordion-item.is-open');
            openItems.forEach(openItem => {
                if (openItem !== item) {
                    closeAccordionItem(openItem);
                }
            });
        }
        openAccordionItem(item);
    }
}

function openAccordionItem(item) {
    const content = item.querySelector('.nasio-accordion-item-content');
	item.classList.add('is-open');
    if (!content) return;

    item.classList.add('is-open');
    
    // Set maxHeight to scrollHeight to enable the CSS transition
    content.style.maxHeight = content.scrollHeight + 'px';

    // Update icon rotation via CSS
    const icon = item.querySelector('.nasio-accordion-icon');
    if (icon) {
        icon.style.transform = 'rotate(180deg)';
    }
}

function closeAccordionItem(item) {
    const content = item.querySelector('.nasio-accordion-item-content');
    if (!content) return;

    item.classList.remove('is-open');
    
    // Set maxHeight to 0 to enable the CSS transition
    content.style.maxHeight = '0px';

    // Reset icon rotation
    const icon = item.querySelector('.nasio-accordion-icon');
    if (icon) {
        icon.style.transform = 'rotate(0deg)';
    }
}

export function View() {
    return null;
}