// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.impact-card');

    const phases = [
        { className: 'card-face-front', duration: 4000 },
        { className: 'card-face-feedback', duration: 4000 },
        { className: 'card-face-action', duration: 4000 }
    ];

    cards.forEach((card, index) => {
        let currentPhaseIndex = 0;
        let rotation = 0; // Tracks rotation for 3D flip effect

        // Stagger initial start slightly
        setTimeout(() => {
            animateCard(card);
        }, index * 1000); // Stagger by 1 second per card

        function animateCard(cardElement) {
            function nextPhase() {
                // Determine the next phase
                currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
                const nextPhaseData = phases[currentPhaseIndex];

                // Remove previous rotation class (if any)
                cardElement.classList.remove('rotated-feedback', 'rotated-action');

                // Apply new rotation based on the phase
                if (nextPhaseData.className === 'card-face-feedback') {
                    rotation = 180; // Flip to feedback
                    cardElement.classList.add('rotated-feedback');
                } else if (nextPhaseData.className === 'card-face-action') {
                    rotation = 0; // Reset rotation for action face (if using layered faces)
                    rotation = 180; // Keep same rotation for this example to reuse feedback face
                    cardElement.classList.add('rotated-action');
                } else { // card-face-front
                    rotation = 0; // Flip back to front
                }

                // For a simpler "fade out then fade in" approach for different content:
                // We're simulating a flip using rotation here, but actual content visibility needs management.
                // In a true 3D flip, you'd rotate the parent and change content based on angle or manage visibility.
                // For this example, we'll use CSS classes to manage the faces' visibility by rotating the PARENT.

                // The rotation needs to be applied to the PARENT card for a continuous flip.
                // The visibility of the faces needs to be managed within CSS based on parent rotation.

                // Let's refine the CSS animation to show faces correctly.
                // For now, let's simplify the JS to just manage a 'state' class on the parent.
                // State 0: Front visible
                // State 1: Feedback visible
                // State 2: Action visible

                // Update card state for CSS
                cardElement.setAttribute('data-current-state', currentPhaseIndex);

                // Schedule next phase
                setTimeout(nextPhase, nextPhaseData.duration);
            }
            nextPhase(); // Start the animation loop
        }
    });

    // --- Animation Logic for Card Faces ---
    // Instead of rotating card-faces individually, we rotate the parent .impact-card
    // and use CSS to show the correct face based on the rotation or a data-attribute.
    // The previous JS attempt for `rotation = 180` and `rotation = 0` was slightly
    // misinterpreting how a continuous 3D flip works for multiple faces.

    // A more robust way: Use data-attributes or classes on the parent card
    // to control which face is visible through CSS transforms/opacity.

    // Redefine the `animateCard` function for better face management:
    cards.forEach((card, index) => {
        let currentState = 0; // 0: front, 1: feedback, 2: action
        const delay = index * 1000; // Stagger initial start

        function cycleCardStates() {
            // Set data attribute to control CSS visibility/transform
            card.setAttribute('data-current-state', currentState);

            // Determine next state
            currentState = (currentState + 1) % 3; // Cycle 0, 1, 2, then back to 0

            // Schedule next state transition
            let duration = 4000; // Default display duration
            if (currentState === 0) { /* If cycling back to front, maybe a slightly longer pause? */ }

            setTimeout(cycleCardStates, duration);
        }

        setTimeout(cycleCardStates, delay); // Start the cycle for each card
    });

});