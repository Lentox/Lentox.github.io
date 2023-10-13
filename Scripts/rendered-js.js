const particles = Particles.init({
    selector: ".background",
    color: ["#6b2e88", "#703fea", "#1122a0"],
    connectParticles: true,
    responsive: [
        {
            breakpoint: 768,
            options: {
                color: ["#faebd7", "#03dac6", "#ff0266"],
                maxParticles: 43,
                connectParticles: false
            }
        }]
});