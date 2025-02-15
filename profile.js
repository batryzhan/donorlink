let currentField = null;
let currentElement = null;

function openModal(fieldType, currentValue) {
    const modal = document.getElementById('editModal');
    const input = document.getElementById('modalInput');
    const select = document.getElementById('modalSelect');
    const title = document.getElementById('modalTitle');

    if(fieldType === 'bloodType') {
        select.style.display = 'block';
        input.style.display = 'none';
        select.value = currentValue;
        title.textContent = 'Edit Blood Type';
        currentField = 'select';
    } else {
        select.style.display = 'none';
        input.style.display = 'block';
        input.value = currentValue;
        title.textContent = `Edit ${fieldType}`;
        currentField = 'input';

        if(fieldType === 'Donation Date' || fieldType === 'Birthdate') {
            input.type = 'date';
        } else {
            input.type = 'text';
        }
    }
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('editModal').classList.remove('active');
    currentField = null;
    currentElement = null;
}

function saveChanges() {
    if(!currentField) return;
    const value = currentField === 'input'
        ? document.getElementById('modalInput').value
        : document.getElementById('modalSelect').value;

    if(value && currentElement) {
        currentElement.textContent = value;
    }
    closeModal();
}
function editName() {
    currentElement = document.querySelector('.name-section h1');
    openModal('Name', currentElement.textContent);
}

function editBloodType() {
    currentElement = document.getElementById('bloodType');
    openModal('bloodType', currentElement.textContent);
}

function editDonationDate() {
    currentElement = document.getElementById('lastDonation');
    openModal('Donation Date', currentElement.textContent);
}

function editBirthdate() {
    currentElement = document.getElementById('birthdate');
    openModal('Birthdate', currentElement.textContent);
}
function setActive(element) {
    document.querySelectorAll('.fot-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
}
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('imagePreview').style.backgroundImage = `url(${event.target.result})`;
    };
    reader.readAsDataURL(e.target.files[0]);
});
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if(event.target === modal) closeModal();
};
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
});
document.querySelectorAll('.detail-item').forEach(item => {
    item.addEventListener('mouseover', () =>
        item.style.transform = 'translateX(10px)');
    item.addEventListener('mouseout', () =>
        item.style.transform = 'translateX(0)');
});
