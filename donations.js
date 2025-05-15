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

// Form validation function
function validateForm(formData) {
    let isValid = true;
    let errorMessage = '';

    if (!formData.fullName || formData.fullName.trim() === '') {
        isValid = false;
        errorMessage = 'Толық аты-жөні енгізіңіз';
    } else if (!formData.age || formData.age < 18 || formData.age > 65) {
        isValid = false;
        errorMessage = 'Жасыңыз 18-65 аралығында болуы керек';
    } else if (!formData.gender) {
        isValid = false;
        errorMessage = 'Жынысыңызды таңдаңыз';
    } else if (!formData.bloodType) {
        isValid = false;
        errorMessage = 'Қан тобын таңдаңыз';
    } else if (!formData.rhFactor) {
        isValid = false;
        errorMessage = 'Rh факторын таңдаңыз';
    } else if (!formData.city || formData.city.trim() === '') {
        isValid = false;
        errorMessage = 'Қала/Аймақ енгізіңіз';
    } else if (!formData.contact || formData.contact.trim() === '') {
        isValid = false;
        errorMessage = 'Байланыс ақпаратын енгізіңіз';
    }

    return { isValid, errorMessage };
}

// Save donor data to localStorage
function saveDonorData(formData) {
    // Save each field individually
    localStorage.setItem('donorFullName', formData.fullName);
    localStorage.setItem('donorAge', formData.age);
    localStorage.setItem('donorGender', formData.gender);
    localStorage.setItem('donorBloodType', formData.bloodType);
    localStorage.setItem('donorRhFactor', formData.rhFactor);
    localStorage.setItem('donorCity', formData.city);
    localStorage.setItem('donorContact', formData.contact);
    
    // Save the complete blood type (with Rh factor)
    const fullBloodType = `${formData.bloodType}${formData.rhFactor === 'positive' ? '+' : '-'}`;
    localStorage.setItem('donorFullBloodType', fullBloodType);
    
    // Save donation date
    const currentDate = new Date();
    localStorage.setItem('lastDonationDate', currentDate.toISOString());
    
    // Increment donation count
    const donationCount = parseInt(localStorage.getItem('donationCount') || '0');
    localStorage.setItem('donationCount', donationCount + 1);
}

document.addEventListener("DOMContentLoaded", () => {
    // Donor Form Submission
    const donorForm = document.getElementById("donorInfoForm");
    if (donorForm) {
        donorForm.addEventListener("submit", (e) => {
            e.preventDefault();

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

            // Validate form
            const { isValid, errorMessage } = validateForm(formData);

            if (!isValid) {
                showAlert(errorMessage, 'error');
                return;
            }

            // Show preloader
            const preloader = document.getElementById('preloader');
            preloader.style.display = 'flex';

            // Simulate form submission delay (in a real app, this would be an AJAX call)
            setTimeout(() => {
                // Hide preloader
                preloader.style.display = 'none';

                // Save donor data to localStorage
                saveDonorData(formData);

                console.log("Form Data:", formData);

                // Show success alert
                showAlert("Мәліметтер сәтті сақталды!", 'success');

                // Scroll to recommendations section
                const recommendationsSection = document.querySelector('.recommendations-card');
                if (recommendationsSection) {
                    recommendationsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500); // 1.5 seconds delay for simulation
        });
    }

    // Add animation to recommendation items
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    if (recommendationItems.length > 0) {
        recommendationItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }
});

// Eligibility Test Functions
function nextQuestion(currentQ, isYes) {
    document.getElementById(`question${currentQ}`).classList.add('hidden');
    document.getElementById(`question${currentQ + 1}`).classList.remove('hidden');

    // Add fade-in animation
    const nextQuestion = document.getElementById(`question${currentQ + 1}`);
    nextQuestion.style.opacity = '0';
    nextQuestion.style.transform = 'translateY(20px)';

    setTimeout(() => {
        nextQuestion.style.transition = 'all 0.5s ease';
        nextQuestion.style.opacity = '1';
        nextQuestion.style.transform = 'translateY(0)';
    }, 50);
}

function showResult(isEligible) {
    // Hide all questions
    document.querySelectorAll('.test-question').forEach(q => {
        q.classList.add('hidden');
    });

    const resultDiv = document.getElementById('testResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');

    if (isEligible) {
        resultDiv.className = 'test-result eligible';
        resultIcon.className = 'bx bx-check-circle';
        resultTitle.textContent = 'Құттықтаймыз!';
        resultText.textContent = 'Сіз қан доноры бола аласыз! Бізбен бірге өмір сыйлаңыз.';
        
        // Save eligibility status to localStorage
        localStorage.setItem('donorEligible', 'true');
    } else {
        resultDiv.className = 'test-result not-eligible';
        resultIcon.className = 'bx bx-x-circle';
        resultTitle.textContent = 'Өкінішке орай...';
        resultText.textContent = 'Қазіргі уақытта сіз қан тапсыра алмайсыз. Дәрігерге қаралыңыз.';
        
        // Save eligibility status to localStorage
        localStorage.setItem('donorEligible', 'false');
    }

    resultDiv.classList.remove('hidden');

    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function resetTest() {
    // Hide result and all questions except first
    document.getElementById('testResult').classList.add('hidden');
    document.querySelectorAll('.test-question').forEach((q, index) => {
        if (index === 0) {
            q.classList.remove('hidden');

            // Add fade-in animation
            q.style.opacity = '0';
            q.style.transform = 'translateY(20px)';

            setTimeout(() => {
                q.style.transition = 'all 0.5s ease';
                q.style.opacity = '1';
                q.style.transform = 'translateY(0)';
            }, 50);
        } else {
            q.classList.add('hidden');
        }
    });
}

// Make these functions globally available
window.nextQuestion = nextQuestion;
window.showResult = showResult;
window.resetTest = resetTest;
