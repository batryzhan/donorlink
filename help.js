function selectAmount(amount) {
    document.getElementById('amount').value = amount;
    const buttons = document.querySelectorAll('.amount-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Банк логотиптерімен select-ты жаңарту
document.addEventListener('DOMContentLoaded', function() {
    const paymentSelect = document.getElementById('payment-method');

    // Бастапқы логотипті орнату
    updateSelectLogo();

    // Өзгерген кезде жаңарту
    paymentSelect.addEventListener('change', updateSelectLogo);

    function updateSelectLogo() {
        const selectedOption = paymentSelect.options[paymentSelect.selectedIndex];
        const iconUrl = selectedOption.getAttribute('data-icon');

        if (iconUrl) {
            paymentSelect.style.backgroundImage = `url(${iconUrl})`;
            paymentSelect.style.paddingLeft = '50px';
        } else {
            paymentSelect.style.backgroundImage = 'none';
            paymentSelect.style.paddingLeft = '15px';
        }
    }
});

// Арнайы хабарлама функциялары
function showAlert(message, type = 'warning') {
    const alert = document.querySelector('.alert');
    const msg = document.querySelector('.msg');

    // Хабарламаны орнату және типіне қарай стильдерді реттеу
    msg.textContent = message;

    if (type === 'success') {
        alert.style.background = '#a8f0c1';
        alert.style.borderLeft = '6px solid #4CAF50';
        alert.querySelector('.fa-exclamation-circle').style.color = '#4CAF50';
        alert.querySelector('.msg').style.color = '#4CAF50';
        alert.querySelector('.close-btn').style.background = '#96e6a1';
        alert.querySelector('.close-btn .fas').style.color = '#4CAF50';
    } else if (type === 'error') {
        alert.style.background = '#ffb3b3';
        alert.style.borderLeft = '6px solid #f44336';
        alert.querySelector('.fa-exclamation-circle').style.color = '#f44336';
        alert.querySelector('.msg').style.color = '#f44336';
        alert.querySelector('.close-btn').style.background = '#ff9999';
        alert.querySelector('.close-btn .fas').style.color = '#f44336';
    } else {
        // Әдепкі ескерту стилі
        alert.style.background = '#ffdb9b';
        alert.style.borderLeft = '6px solid #ffa502';
        alert.querySelector('.fa-exclamation-circle').style.color = '#ce8500';
        alert.querySelector('.msg').style.color = '#ce8500';
        alert.querySelector('.close-btn').style.background = '#ffd080';
        alert.querySelector('.close-btn .fas').style.color = '#ce8500';
    }

    alert.classList.add("show");
    alert.classList.remove("hide");
    alert.classList.add("showAlert");

    setTimeout(function() {
        alert.classList.remove("show");
        alert.classList.add("hide");
    }, 5000);
}

// Жабу түймесінің оқиғасы
document.querySelector('.close-btn').addEventListener('click', function() {
    document.querySelector('.alert').classList.remove("show");
    document.querySelector('.alert').classList.add("hide");
});

// Форманы жіберу (preloader-мен)
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Preloader-ді көрсету
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'flex';

    // Жіберу түймесін өшіру
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;

    // Өңдеу кідірісін симуляциялау (2 секунд)
    setTimeout(function() {
        const amount = document.getElementById('amount').value;
        const method = document.getElementById('payment-method').value;
        const name = document.getElementById('name').value;

        // Preloader-ді жасыру
        preloader.style.display = 'none';

        // Сәтті хабарламаны көрсету
        showAlert(`Рақмет сізге, ${name}! Сіздің ${amount} ₸ сомасындағы қайырымдылығыңыз ${method} арқылы өңделді.`, 'success');

        // Форманы қалпына келтіру
        document.getElementById('donationForm').reset();

        // Белсенді сома түймелерін қалпына келтіру
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));

        // Жіберу түймесін қосу
        submitBtn.disabled = false;
    }, 2000);
});

// Белсенді навигация элементін орнату
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});
