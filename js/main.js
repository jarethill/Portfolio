(() => {
    // Initialize animate on scroll
    if (AOS) {
        AOS.init();
    }

    // Add stagger effect to skill logos
    const logos = [...document.querySelectorAll('.logos > img')];

    const delayIncrement = 100;
    let startingDelay = 200;

    logos.forEach((logo) => {
        logo.dataset.aosDelay = startingDelay;
        startingDelay += delayIncrement;
    });
})();
