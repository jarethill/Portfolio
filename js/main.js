(() => {
    // Initialize animate on scroll
    if (AOS) {
        AOS.init();
    }

    // Add stagger effect to skill logos
    const logos = [...document.querySelectorAll('.logos > img')];

    const delayAmount = 50;
    let startingDelay = delayAmount;

    logos.forEach((logo) => {
        logo.dataset.aosDelay = startingDelay;
        startingDelay += delayAmount;
    });
})();
