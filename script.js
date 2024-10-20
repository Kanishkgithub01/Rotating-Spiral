
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

class Particle {
    constructor(angle, radius, speed, color) {
        this.angle = angle;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
    }

    update() {
        this.angle += this.speed;
        const x = centerX + this.radius * Math.cos(this.angle);
        const y = centerY + this.radius * Math.sin(this.angle);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();  
    }
}

function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 200 + 50; // Random radius between 50 and 250
        const speed = Math.random() * 0.02 + 0.005; // Random speed
        const color = `hsl(${Math.random() * 360}, 70%, 70%)`; // Random color
        particles.push(new Particle(angle, radius, speed, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(200); // Reinitialize particles on resize
});

initParticles(200);
animate();