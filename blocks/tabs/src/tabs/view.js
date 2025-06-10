/**
 * Initialize tabs
 */
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
});

function initTabs() {
    const tabContainers = document.querySelectorAll('.nasio-tabs');

    tabContainers.forEach(container => {
        const defaultActiveTab = container.dataset.defaultActive || '';
        const tabs = container.querySelectorAll('.nasio-tab');
        
        // Create tab navigation if it doesn't exist
        let tabNav = container.querySelector('.nasio-tabs-nav');
        if (!tabNav) {
            tabNav = createTabNavigation(container, tabs);
        }

        // Initialize tabs
        tabs.forEach((tab, index) => {
            const isDefaultActive = defaultActiveTab && tab.dataset.blockId === defaultActiveTab;
            const isFirstTab = index === 0 && !defaultActiveTab;
            
            if (isDefaultActive || isFirstTab) {
                activateTab(tab, container);
            } else {
                deactivateTab(tab);
            }
        });

        // Add click event listeners to tab navigation
        const navButtons = tabNav.querySelectorAll('.nasio-tab-nav-button');
        navButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const targetTab = tabs[index];
                if (targetTab) {
                    activateTab(targetTab, container);
                }
            });
        });
    });
}

function createTabNavigation(container, tabs) {
    const tabNav = document.createElement('div');
    tabNav.className = 'nasio-tabs-nav';
    
    tabs.forEach((tab, index) => {
        const button = document.createElement('button');
        button.className = 'nasio-tab-nav-button';
        button.textContent = tab.querySelector('.nasio-tab-title')?.textContent || `Tab ${index + 1}`;
        button.setAttribute('data-tab-index', index);
        tabNav.appendChild(button);
    });
    
    // Insert navigation before the first tab
    const firstTab = container.querySelector('.nasio-tab');
    if (firstTab) {
        container.insertBefore(tabNav, firstTab);
    }
    
    return tabNav;
}

function activateTab(activeTab, container) {
    // Deactivate all tabs in this container
    const allTabs = container.querySelectorAll('.nasio-tab');
    const allNavButtons = container.querySelectorAll('.nasio-tab-nav-button');
    
    allTabs.forEach(tab => deactivateTab(tab));
    allNavButtons.forEach(button => button.classList.remove('is-active'));
    
    // Activate the target tab
    activeTab.classList.add('is-active');
    const content = activeTab.querySelector('.nasio-tab-content');
    if (content) {
        content.style.display = 'block';
    }
    
    // Activate corresponding navigation button
    const tabIndex = Array.from(allTabs).indexOf(activeTab);
    if (allNavButtons[tabIndex]) {
        allNavButtons[tabIndex].classList.add('is-active');
    }
}

function deactivateTab(tab) {
    tab.classList.remove('is-active');
    const content = tab.querySelector('.nasio-tab-content');
    if (content) {
        content.style.display = 'none';
    }
}
