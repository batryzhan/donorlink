function checkVisibility()   {
    const steps = document.querySelectorAll('.step');
    const features = document.querySelectorAll('.feature-item');

    steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            step.classList.add('visible');
        }
    });
    features.forEach((feature, index) => {
        feature.style.setProperty('--index', index);
        const rect = feature.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            feature.style.opacity = 1;
            feature.style.transform = 'translateY(0)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    document.querySelectorAll('.fot-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            setActive(this);
            setTimeout(() => {
                window.location.href = this.href;
            }, 200);
        });
    });
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});
function setActive(element) {
    document.querySelectorAll('.fot-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
}
function editProfile() {
    alert("Edit Profile feature coming soon!");
}

function logout() {
    alert("You have been logged out.");
    window.location.href = "login.html";
}
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    document.querySelectorAll('.fot-item').forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
function setActive(element) {
    const link = element.querySelector('a');
    if (link) {
        window.location.href = link.getAttribute('href');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const locationCards = document.querySelectorAll('.location-card');
    const mainMap = document.getElementById('mainMap');
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            locationCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const newMapUrl = this.getAttribute('data-map');
            mainMap.src = newMapUrl;
        });
    });
});
function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').style.backgroundImage = `url(${e.target.result})`;
            localStorage.setItem('profileImage', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('imageUpload').addEventListener('change', function() {
    readURL(this);
});
window.addEventListener('load', function() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        document.getElementById('imagePreview').style.backgroundImage = `url(${savedImage})`;
    }
});
document.querySelectorAll('.amount-option').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.amount-option').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('amount').value = this.textContent.replace('$', '');
    });
});

document.querySelectorAll('.method-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.method-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
    });
});
function showForm(role) {
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.remove('visible');
        form.classList.add('hidden');
    });

    const form = document.querySelector(`.${role}-form`);
    form.classList.remove('hidden');
    setTimeout(() => form.classList.add('visible'), 10);
    document.querySelectorAll('.btn').forEach(btn => btn.style.transform = 'scale(1)');
    event.target.style.transform = 'scale(1.05)';
}
function setupUpload(uploadAreaId) {
    const uploadArea = document.getElementById(uploadAreaId);
    const fileInput = uploadArea.querySelector('input[type="file"]');

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ff6b6b';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        fileInput.files = e.dataTransfer.files;
        handleFile(fileInput.files[0]);
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFile(fileInput.files[0]);
        }
    });
}
function showForm(formType) {
    document.querySelectorAll('.form-container').forEach(form => {
        form.style.display = 'none';
    });
    document.querySelector(`.${formType}-form`).style.display = 'block';
}
function handleFileUpload(input, uploadAreaId) {
    const uploadArea = document.getElementById(uploadAreaId);
    const file = input.files[0];
    if (file) {
        const allowedTypes = ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload only PDF or Word documents.');
            input.value = '';
            return;
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size exceeds 5MB limit.');
            input.value = '';
            return;
        }

        uploadArea.innerHTML = `
                <i class="bxs bx-check-circle" style="color: #27ae60;"></i>
                <p>${file.name} (${(file.size/1024/1024).toFixed(2)}MB)</p>
            `;
    }
}
document.querySelectorAll('.upload-area').forEach(area => {
    area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.classList.add('dragover');
    });

    area.addEventListener('dragleave', () => {
        area.classList.remove('dragover');
    });

    area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.classList.remove('dragover');
        const input = area.querySelector('input[type="file"]');
        input.files = e.dataTransfer.files;
        handleFileUpload(input, area.id);
    });
});
function handleSubmit(event, formType) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('.submit-btn');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.fa-spinner');
    const successMessage = form.parentElement.querySelector('.success-message');
    buttonText.textContent = 'Submitting...';
    spinner.classList.remove('hidden');
    submitButton.disabled = true;
    setTimeout(() => {
        // Reset button state
        buttonText.textContent = formType === 'donor' ? 'Submit Donation' : 'Submit Request';
        spinner.classList.add('hidden');
        submitButton.disabled = false;
        form.style.display = 'none';
        successMessage.classList.add('show');
        form.reset();
        const uploadArea = form.querySelector('.upload-area');
        uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & Drop or Click to Upload Documents (PDF/DOC, max 5MB)</p>
            `;
    }, 2000);
}
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.checkValidity()) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });
});
document.getElementById("donationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);

    alert("Thank you for your willingness to donate! We will contact you soon.");
    event.target.reset();
});
const linkItems = document.querySelectorAll(".link-item");
linkItems.forEach((linkItem, index) => {
    linkItem.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        linkItem.classList.add("active");
        const indicator = document.querySelector(".indicator");
        indicator.style.left = `${index * 95 + 48}px`;
    })
});

// Smooth page transitions
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Skip external links and anchor links
        if (this.hostname !== window.location.hostname || this.hash) return;

        e.preventDefault();
        const href = this.href;

        // Trigger exit animation
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('page-exit');
        }

        // Navigate after animation completes
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});




