document.addEventListener('DOMContentLoaded', function () {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    // Handle form submissions with animation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form inputs
            const emailInput = form.querySelector('input[type="email"], input[placeholder="Email"]');
            const passwordInput = form.querySelector('input[type="password"]');

            // Validation
            if (!emailInput.value.includes('@')) {
                alert('Please enter a valid email address!');
                return;
            }

            if (passwordInput.value.length < 8) {
                alert('Password must be at least 8 characters!');
                return;
            }

            // Add exit animation
            document.body.classList.add('page-exit');

            // Redirect after animation
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 500);
        });
    });
});
