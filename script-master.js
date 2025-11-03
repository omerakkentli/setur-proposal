// script-master.js

document.addEventListener('DOMContentLoaded', () => {
    const opportunitiesList = document.querySelector('.opportunities-list');
    const listContainer = document.querySelector('.opportunities-list-container');
    const cards = Array.from(opportunitiesList.children);

    if (!opportunitiesList || cards.length === 0 || !listContainer) {
        console.warn('Opportunities list or cards not found. Animation skipped.');
        return;
    }

    // --- Dynamic Calculation of Card Height ---
    // Ensure cards are rendered before calculating height
    const cardHeight = cards[0].offsetHeight + parseFloat(getComputedStyle(opportunitiesList).gap);
    if (isNaN(cardHeight) || cardHeight === 0) {
        console.error('Card height calculation failed. Ensure cards are visible and have dimensions.');
        return;
    }

    const visibleCardsCount = Math.floor(listContainer.offsetHeight / cardHeight); // Dynamically calculate how many cards fit
    // Ensure we clone enough to make a seamless loop
    const clonesNeeded = Math.max(cards.length, visibleCardsCount + 1); // Clone at least all original cards, plus one more to be safe

    let currentScrollY = 0;
    let animationPaused = false;
    let animationFrameId; // To store the requestAnimationFrame ID

    // --- Clone cards for infinite scroll ---
    // Clear existing clones if script is re-run (e.g., during development)
    opportunitiesList.innerHTML = '';
    cards.forEach(card => opportunitiesList.appendChild(card.cloneNode(true))); // Add original cards first

    for (let i = 0; i < clonesNeeded; i++) {
        opportunitiesList.appendChild(cards[i % cards.length].cloneNode(true)); // Append clones of original cards
    }


    function animateScroll() {
        if (animationPaused) {
            animationFrameId = requestAnimationFrame(animateScroll);
            return;
        }

        currentScrollY += 0.5; // Scroll speed in pixels, adjust as needed

        // Check if we've scrolled past the original content (and clones of it)
        // Reset scroll position to create a seamless loop
        if (currentScrollY >= cards.length * cardHeight) {
             currentScrollY = 0; // Reset to the beginning of the original content
        }

        opportunitiesList.style.transform = `translateY(-${currentScrollY}px)`;
        animationFrameId = requestAnimationFrame(animateScroll);
    }

    // --- Event Listeners ---
    listContainer.addEventListener('mouseenter', () => {
        animationPaused = true;
    });

    listContainer.addEventListener('mouseleave', () => {
        animationPaused = false;
    });

    // Start animation after a short delay to ensure DOM is fully rendered
    setTimeout(() => {
        animateScroll();
    }, 100); // Small delay
});