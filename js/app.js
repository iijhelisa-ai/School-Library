document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');
    const homeCards = document.querySelectorAll('.card');

    function switchView(targetId) {
        // Update nav buttons
        navButtons.forEach(btn => {
            if (btn.dataset.target === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update view sections
        viewSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
                section.classList.add('active');
            } else {
                section.classList.remove('active');
                section.classList.add('hidden');
            }
        });
        
        // Hide story content if navigating away from story view
        if(targetId !== 'story-view') {
            const storyContent = document.getElementById('story-content');
            const storySelection = document.getElementById('story-selection');
            if(storyContent && storySelection) {
                storyContent.classList.add('hidden');
                storySelection.classList.remove('hidden');
            }
        }
    }

    // Add click event to nav buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.dataset.target);
        });
    });

    // Add click event to home cards
    homeCards.forEach(card => {
        card.addEventListener('click', () => {
            switchView(card.dataset.target);
        });
    });

    // Initialize game on load if script is ready
    if (typeof initGame === 'function') {
        initGame();
    }
});
