// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.impact-card');

    // --- Animation Logic for Card Faces ---
    // Use data-attributes on the parent card to control which face is visible
    // through CSS transforms/opacity.

    cards.forEach((card, index) => {
        let currentState = 0; // 0: front, 1: review, 2: feedback, 3: action
        const delay = index * 1000; // Stagger initial start by 1 second

        function cycleCardStates() {
            // Set data attribute to control CSS visibility/transform
            card.setAttribute('data-current-state', currentState);

            // Determine next state
            currentState = (currentState + 1) % 4; // NOW CYCLES 0, 1, 2, 3, then back to 0

            // Schedule next state transition
            let duration = 4000; // Default display duration for each state (4 seconds)

            setTimeout(cycleCardStates, duration);
        }

        setTimeout(cycleCardStates, delay); // Start the cycle for each card
    });

});