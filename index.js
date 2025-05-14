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
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"], input[placeholder="Email"]');
            const passwordInput = form.querySelector('input[type="password"]');
            if (!emailInput.value.includes('@')) {
                alert('Please enter a valid email address!');
                return;
            }

            if (passwordInput.value.length < 8) {
                alert('Password must be at least 8 characters!');
                return;
            }
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 500);
        });
    });
});
