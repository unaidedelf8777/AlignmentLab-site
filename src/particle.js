const svgContainer = document.getElementById('particleContainer');

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.initialY = Math.random() * window.innerHeight;
        this.y = this.initialY;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.element = this.createCircle();
        svgContainer.appendChild(this.element);
    }

    createCircle() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', this.size);
        circle.setAttribute('fill', `rgba(255,255,255,${this.size / 5})`);
        return circle;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.y > window.innerHeight + this.size) {
            this.initialY = 0 - this.size;
            this.y = this.initialY;
            this.x = Math.random() * window.innerWidth;
        }

        this.element.setAttribute('cx', this.x);
        this.element.setAttribute('cy', this.y);
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

function animate() {
    handleParticles();
    requestAnimationFrame(animate);
}

export function startParticleAnimation() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    animate();
}

window.addEventListener('resize', function() {
    svgContainer.setAttribute('width', window.innerWidth);
    svgContainer.setAttribute('height', window.innerHeight);
});
