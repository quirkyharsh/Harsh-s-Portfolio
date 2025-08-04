// Mobile Menu
function initMobileMenu() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    try {
        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scroll:', error);
    }
}

// Resume Download
function initResumeDownload() {
    try {
        const resumeBtn = document.getElementById('resume-btn');
        if (!resumeBtn) return;

        resumeBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const link = document.createElement('a');
            link.href = 'https://drive.google.com/uc?export=download&id=1z1DLBN0A7KcplRYIskdywiu2uV6jBxKo';
            link.download = 'Subhajit_Roy_Resume.pdf';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    } catch (error) {
        console.error('Error initializing resume download:', error);
    }
}

// Contact Form (now sends to server)
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', sendMail);
}

function sendMail(event) {
    event.preventDefault();

    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_d0egqcj", "template_b364owo", params)
        .then(() => {
            alert('Your email has been sent!');
            document.getElementById('contact-form').reset();
        })
        .catch(error => {
            alert('Failed to send email: ' + JSON.stringify(error));
            console.error(error);
        });
}

// Page Load Animation
window.addEventListener('load', () => {
    try {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    } catch (error) {
        console.error('Error during page load:', error);
    }
});

// Global Error Handling
window.addEventListener('error', e => {
    console.error('Global error caught:', e.error);
});

window.addEventListener('unhandledrejection', e => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize All Functions
function init() {
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initResumeDownload();
}

document.addEventListener('DOMContentLoaded', init);
