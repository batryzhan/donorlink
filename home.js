// Көрініс кеңістігіне кірген элементтерге анимация
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

// Анимацияланған элементтердің бастапқы күйін орнату
document.querySelectorAll('.patient-card, .feature-card, .step').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Оқиға тыңдаушыларын қосу
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Футер навигациясының белсенді күйі
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Anchor сілтемелері үшін жұмсақ скроллинг
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

    // Қайырымдылық түймелеріне басу
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const patientName = this.getAttribute('data-patient');

            // Жүктеу индикаторын көрсету
            preloader.style.display = 'flex';

            // Өңдеуді симуляциялау (3 секунд)
            setTimeout(() => {
                // Жүктеу индикаторын жасыру
                preloader.style.display = 'none';

                // Сәтті хабарламаны көрсету
                alertBox.querySelector('.msg').textContent = `Рақмет! Біз ${patientName} дәрігерлер тобына сіздің көмек ұсынысыңыз туралы хабарладық.`;
                alertBox.classList.add('show');

                // 5 секундтан соң автоматты жасыру
                setTimeout(() => {
                    alertBox.classList.remove('show');
                    alertBox.classList.add('hide');

                    // Келесі пайдалану үшін қалпына келтіру
                    setTimeout(() => {
                        alertBox.classList.remove('hide');
                    }, 800);
                }, 5000);
            }, 3000);
        });
    });

    // Хабарламаны қолмен жабу
    closeBtn.addEventListener('click', function() {
        alertBox.classList.remove('show');
        alertBox.classList.add('hide');

        // Келесі пайдалану үшін қалпына келтіру
        setTimeout(() => {
            alertBox.classList.remove('hide');
        }, 800);
    });
});
