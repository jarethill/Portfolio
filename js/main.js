(() => {
    // Initialize animate on scroll
    if (AOS) {
        AOS.init();
    }

    // Add stagger effect to skill logos
    const logos = [...document.querySelectorAll('.logos > img')];

    let delayIncrement = 100;
    let startingDelay = 200;

    logos.forEach((logo) => {
        // Reset delays once the next category is reached
        if (!logo.previousElementSibling) {
            delayIncrement = 100;
            startingDelay = 200;
        }

        logo.dataset.aosDelay = startingDelay;
        startingDelay += delayIncrement;
    });
})();
