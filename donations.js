// Alert functions
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
    const alertMsg = document.getElementById('alert-msg');

    alertMsg.textContent = message;

    // Set different styles based on type
    if (type === 'success') {
        alert.style.background = '#c6f6d5';
        alert.style.borderLeft = '6px solid #48bb78';
        alert.querySelector('.msg').style.color = '#2f855a';
        alert.querySelector('.fa-exclamation-circle').style.color = '#48bb78';
        alert.querySelector('.close-btn').style.background = '#9ae6b4';
    } else if (type === 'error') {
        alert.style.background = '#fed7d7';
        alert.style.borderLeft = '6px solid #e53e3e';
        alert.querySelector('.msg').style.color = '#c53030';
        alert.querySelector('.fa-exclamation-circle').style.color = '#e53e3e';
        alert.querySelector('.close-btn').style.background = '#feb2b2';
    }

    alert.classList.add('show');
    alert.classList.add('showAlert');

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideAlert();
    }, 5000);
}

function hideAlert() {
    const alert = document.getElementById('alert');
    alert.classList.remove('show');
    alert.classList.add('hide');

    // Remove hide class after animation completes
    setTimeout(() => {
        alert.classList.remove('hide');
        alert.classList.remove('showAlert');
    }, 800);
}

document.addEventListener("DOMContentLoaded", () => {
    // Donor Form Submission
    const donorForm = document.getElementById("donorInfoForm");
    if (donorForm) {
        donorForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Show preloader
            const preloader = document.getElementById('preloader');
            preloader.style.display = 'flex';

            // Simulate form submission delay (in a real app, this would be an AJAX call)
            setTimeout(() => {
                // Hide preloader
                preloader.style.display = 'none';

                // Get form data
                const formData = {
                    fullName: document.getElementById("fullName").value,
                    age: document.getElementById("age").value,
                    gender: document.getElementById("gender").value,
                    bloodType: document.getElementById("bloodType").value,
                    rhFactor: document.getElementById("rhFactor").value,
                    city: document.getElementById("city").value,
                    contact: document.getElementById("contact").value,
                };

                console.log("Form Data:", formData);

                // Show success alert
                showAlert("Мәліметтер сәтті сақталды!", 'success');

                // Reset form (optional)
                // donorForm.reset();
            }, 2000); // 2 seconds delay for simulation
        });
    }

    // Other existing JavaScript code...
});
