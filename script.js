
function initMobileMenu() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// Smooth scrolling for navigation links
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

// Global flag to prevent multiple form initializations
let contactFormInitialized = false;

// Contact form handling with enhanced feedback
function initContactForm() {
    // Prevent multiple initializations
    if (contactFormInitialized) {
        console.log('Contact form already initialized, skipping...');
        return;
    }

    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.btn-primary');
    if (!submitBtn) return;

    const originalText = submitBtn.textContent;
    let isSubmitting = false; // Prevent multiple submissions

    // Remove any existing event listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Get references to the new form elements
    const freshForm = document.getElementById('contact-form');
    const freshSubmitBtn = freshForm.querySelector('.btn-primary');

    freshForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        
        if (isSubmitting) {
            console.log('Form already submitting, ignoring duplicate submission');
            return;
        }
        
        isSubmitting = true;
        console.log('Form submission started');

        freshSubmitBtn.textContent = 'SENDING...';
        freshSubmitBtn.disabled = true;
        freshSubmitBtn.style.opacity = '0.7';
        freshSubmitBtn.style.pointerEvents = 'none';

        const formData = new FormData(freshForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                freshSubmitBtn.textContent = 'MESSAGE SENT!';
                freshSubmitBtn.style.background = '#000';
                freshSubmitBtn.style.color = '#fff';
                alert(`Thank you ${data.name || 'User'}! Your message has been sent.`);
                freshForm.reset();
            } else {
                alert('❌ Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('❌ Something went wrong while sending your message.');
        } finally {
            // Reset button state
            setTimeout(() => {
                freshSubmitBtn.textContent = originalText;
                freshSubmitBtn.disabled = false;
                freshSubmitBtn.style.opacity = '';
                freshSubmitBtn.style.pointerEvents = '';
                freshSubmitBtn.style.background = '';
                freshSubmitBtn.style.color = '';
                isSubmitting = false;
                console.log('Form submission completed');
            }, 1000);
        }
    });

    contactFormInitialized = true;
    console.log('Contact form initialized successfully');
}

// Resume download functionality
function initResumeDownload() {
    try {
        const resumeBtn = document.getElementById('resume-btn');
        if (!resumeBtn) return;
        
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary download link
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/uc?export=download&id=1z1DLBN0A7KcplRYIskdywiu2uV6jBxKo';
            link.download = 'Subhajit_Roy_Resume.pdf';

            // Trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    } catch (error) {
        console.error('Error initializing resume download:', error);
    }
}



// Start when DOM is loaded - SINGLE ENTRY POINT
document.addEventListener('DOMContentLoaded', init);

// Handle page load
window.addEventListener('load', function() {
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

// Handle errors globally
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

