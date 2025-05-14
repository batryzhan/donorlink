// Simple animation for elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.patient-card, .feature-card, .step');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.patient-card, .feature-card, .step').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Add event listeners
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Footer navigation active state
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const donateButtons = document.querySelectorAll('.donate-btn');
    const preloader = document.getElementById('preloader');
    const alertBox = document.getElementById('alert');
    const closeBtn = document.querySelector('.close-btn');

    // Handle donation button clicks
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const patientName = this.getAttribute('data-patient');

            // Show loading spinner
            preloader.style.display = 'flex';

            // Simulate processing (3 seconds)
            setTimeout(() => {
                // Hide loading spinner
                preloader.style.display = 'none';

                // Show success alert
                alertBox.querySelector('.msg').textContent = `Thank you! We've notified ${patientName}'s medical team about your offer to help.`;
                alertBox.classList.add('show');

                // Auto-hide after 5 seconds
                setTimeout(() => {
                    alertBox.classList.remove('show');
                    alertBox.classList.add('hide');

                    // Reset for next use
                    setTimeout(() => {
                        alertBox.classList.remove('hide');
                    }, 800);
                }, 5000);
            }, 3000);
        });
    });

    // Close alert manually
    closeBtn.addEventListener('click', function() {
        alertBox.classList.remove('show');
        alertBox.classList.add('hide');

        // Reset for next use
        setTimeout(() => {
            alertBox.classList.remove('hide');
        }, 800);
    });
});
