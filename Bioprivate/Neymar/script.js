// Matrix background effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Particle effect
const particleCanvas = document.getElementById('particles');
const particleCtx = particleCanvas.getContext('2d');

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > particleCanvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > particleCanvas.height) this.vy = -this.vy;
    }

    draw() {
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        particleCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        particleCtx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Typing effect for name
const nameElement = document.querySelector('.name');
const nameText = "AzzY"; // Replace with your name
let nameIndex = 0;

function typeWriter() {
    if (nameIndex < nameText.length) {
        nameElement.textContent += nameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Terminal animation
const codeAnimation = document.querySelector('.code-animation');
const commands = [
    'npm install life-skills',
    'Installing dependencies...',
    'Added: problem-solving@latest',
    'Added: creativity@latest',
    'Added: coffee-addiction@latest',
    'Happy coding! 🚀'
];
let commandIndex = 0;

function animateTerminal() {
    if (commandIndex < commands.length) {
        const line = document.createElement('div');
        line.textContent = '$ ' + commands[commandIndex];
        codeAnimation.appendChild(line);
        commandIndex++;
        setTimeout(animateTerminal, 1000);
    }
}

// Skill bar animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// GitHub stats counter animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            number.textContent = Math.round(current).toLocaleString();
            if (current >= target) {
                number.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 20);
    });
}

// Copy code snippet
const copyBtn = document.querySelector('.copy-btn');
const codeSnippet = document.querySelector('code');

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(codeSnippet.textContent.trim());
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
    }, 2000);
});

// Resize handler
function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

// Animation loop
function animate() {
    drawMatrix();
    
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

// Initialize everything
window.addEventListener('resize', handleResize);
window.addEventListener('load', () => {
    typeWriter();
    animateTerminal();
    animateSkills();
    animateNumbers();
    animate();
});

// Add intersection observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.link-card, .stat-card').forEach(card => {
    observer.observe(card);
});