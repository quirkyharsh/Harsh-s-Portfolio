function initMobileMenu() { /* keep same */ }
function initSmoothScroll() { /* keep same */ }
function initResumeDownload() { /* keep same */ }

// Contact form now just uses EmailJS
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
        .catch((error) => {
            alert('Failed to send email: ' + JSON.stringify(error));
            console.error(error);
        });
}

// Initialize everything
function init() {
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initResumeDownload();
}

document.addEventListener('DOMContentLoaded', init);
