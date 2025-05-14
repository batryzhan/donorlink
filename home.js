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
// Technology Carousel
const techWrapper = document.querySelector(".tech-slider-wrapper");
const techCarousel = document.querySelector(".tech-carousel");
const firstTechCard = techCarousel.querySelector(".tech-card");
const firstTechCardWidth = firstTechCard ? firstTechCard.offsetWidth : 0;
const techArrowBtns = document.querySelectorAll(".tech-slider-wrapper i");
const techCarouselChildrens = [...techCarousel.children];

let isTechDragging = false, isTechAutoPlay = true, techStartX, techStartScrollLeft, techTimeoutId;

// Get the number of cards that can fit in the carousel at once
let techCardPerView = Math.round(techCarousel.offsetWidth / firstTechCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
techCarouselChildrens.slice(-techCardPerView).reverse().forEach(card => {
    techCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
techCarouselChildrens.slice(0, techCardPerView).forEach(card => {
    techCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate position to hide first few duplicate cards
techCarousel.classList.add("no-transition");
techCarousel.scrollLeft = techCarousel.offsetWidth;
techCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
techArrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        techCarousel.scrollLeft += btn.id == "left-tech" ? -firstTechCardWidth : firstTechCardWidth;
    });
});

const techDragStart = (e) => {
    isTechDragging = true;
    techCarousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    techStartX = e.pageX;
    techStartScrollLeft = techCarousel.scrollLeft;
}

const techDragging = (e) => {
    if(!isTechDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    techCarousel.scrollLeft = techStartScrollLeft - (e.pageX - techStartX);
}

const techDragStop = () => {
    isTechDragging = false;
    techCarousel.classList.remove("dragging");
}

const techInfiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(techCarousel.scrollLeft === 0) {
        techCarousel.classList.add("no-transition");
        techCarousel.scrollLeft = techCarousel.scrollWidth - (2 * techCarousel.offsetWidth);
        techCarousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(techCarousel.scrollLeft) === techCarousel.scrollWidth - techCarousel.offsetWidth) {
        techCarousel.classList.add("no-transition");
        techCarousel.scrollLeft = techCarousel.offsetWidth;
        techCarousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(techTimeoutId);
    if(!techWrapper.matches(":hover")) techAutoPlay();
}

const techAutoPlay = () => {
    if(window.innerWidth < 800 || !isTechAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    techTimeoutId = setTimeout(() => techCarousel.scrollLeft += firstTechCardWidth, 2500);
}

// Initialize the tech carousel if it exists
if(techCarousel) {
    techAutoPlay();
    techCarousel.addEventListener("mousedown", techDragStart);
    techCarousel.addEventListener("mousemove", techDragging);
    document.addEventListener("mouseup", techDragStop);
    techCarousel.addEventListener("scroll", techInfiniteScroll);
    techWrapper.addEventListener("mouseenter", () => clearTimeout(techTimeoutId));
    techWrapper.addEventListener("mouseleave", techAutoPlay);
}
