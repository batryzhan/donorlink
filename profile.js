document.addEventListener('DOMContentLoaded', () => {
    // Load saved user data from localStorage
    const savedName = localStorage.getItem('userFullName');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedName) {
        document.getElementById('profileName').textContent = savedName;
        document.getElementById('fullName').textContent = savedName;
    }
    
    if (savedEmail) {
        document.getElementById('email').textContent = savedEmail;
    }

    const editBtn = document.getElementById('editProfileBtn');
    const editableFields = document.querySelectorAll('.info-value');
    const preloader = document.getElementById('preloader');
    const alertBox = document.getElementById('alert');
    const closeBtn = document.querySelector('.close-btn');
    const profileImageButton = document.getElementById('profileImageButton');
    const profileName = document.getElementById('profileName');
    const fullName = document.getElementById('fullName');
    let isEditMode = false;

    // Edit Profile Button Handler
    editBtn.addEventListener('click', async() => {
        if (!isEditMode) {
            // Enter edit mode
            enterEditMode();
        } else {
            // Save changes
            await saveChanges();
        }
    });

    // Helper functions
    function enterEditMode() {
        editableFields.forEach(field => {
            field.contentEditable = true;
            field.focus();
        });
        editBtn.innerHTML = `<i class='bx bx-save' style="margin-right: 8px;"></i> Save Changes`;
        isEditMode = true;
    }

    async function saveChanges() {
        try {
            showPreloader('Saving changes...');

            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Sync profile name if full name was changed
            if (fullName.textContent !== profileName.textContent) {
                profileName.textContent = fullName.textContent;
                // Update in localStorage as well
                localStorage.setItem('userFullName', fullName.textContent);
            }

            showAlert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            showAlert('Error saving changes. Please try again.', 'error');
        } finally {
            exitEditMode();
            hidePreloader();
        }
    }

    function exitEditMode() {
        editableFields.forEach(field => {
            field.contentEditable = false;
        });
        editBtn.innerHTML = `<i class='bx bx-edit-alt' style="margin-right: 8px;"></i> Edit Profile`;
        isEditMode = false;
    }

    // Edit Profile Button Handler
    editBtn.addEventListener('click', async() => {
        if (!isEditMode) {
            // Enter edit mode
            enterEditMode();
        } else {
            // Save changes
            await saveChanges();
        }
    });

    // Profile Image Upload Handler
    profileImageButton.addEventListener('click', () => {
        handleProfileImageUpload();
    });

    // Close alert button
    closeBtn.addEventListener('click', () => {
        hideAlert();
    });

    // Helper functions
    function enterEditMode() {
        editableFields.forEach(field => {
            field.contentEditable = true;
            field.focus();
        });
        editBtn.innerHTML = `<i class='bx bx-save' style="margin-right: 8px;"></i> Save Changes`;
        isEditMode = true;
    }

    async function saveChanges() {
        try {
            showPreloader('Saving changes...');

            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Sync profile name if full name was changed
            if (fullName.textContent !== profileName.textContent) {
                profileName.textContent = fullName.textContent;
                // Update in localStorage as well
                localStorage.setItem('userFullName', fullName.textContent);
            }

            // Here you would typically send the updated data to your backend
            // For this example, we'll just simulate it
            const updatedData = {
                fullName: fullName.textContent,
                dob: document.getElementById('dob').textContent,
                email: document.getElementById('email').textContent,
                phone: document.getElementById('phone').textContent,
                gender: document.getElementById('gender').textContent,
                bloodType: document.getElementById('bloodType').textContent,
                lastDonation: document.getElementById('lastDonationDate').textContent,
                eligible: document.getElementById('eligible').textContent,
                healthConditions: document.getElementById('healthConditions').textContent
            };

            console.log('Updated profile data:', updatedData);

            showAlert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            showAlert('Error saving changes. Please try again.', 'error');
        } finally {
            exitEditMode();
            hidePreloader();
        }
    }

    function exitEditMode() {
        editableFields.forEach(field => {
            field.contentEditable = false;
        });
        editBtn.innerHTML = `<i class='bx bx-edit-alt' style="margin-right: 8px;"></i> Edit Profile`;
        isEditMode = false;
    }

    async function handleProfileImageUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async(e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    showPreloader('Updating profile picture...');

                    // Simulate image upload with a delay
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Update profile image
                    const profileIcon = document.querySelector('.profile-image-icon');
                    const imageUrl = URL.createObjectURL(file);

                    // Check if there's already an image
                    const existingImg = profileImageButton.querySelector('img');
                    if (existingImg) {
                        existingImg.src = imageUrl;
                    } else {
                        // Create image element
                        const img = document.createElement('img');
                        img.src = imageUrl;
                        img.alt = "Profile";
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '50%';

                        // Replace icon with image
                        profileIcon.style.display = 'none';
                        profileImageButton.querySelector('.profile-image-content').prepend(img);
                    }

                    showAlert('Profile picture updated!');
                } catch (error) {
                    console.error('Error updating profile image:', error);
                    showAlert('Error updating profile picture', 'error');
                } finally {
                    hidePreloader();
                }
            }
        };
        input.click();
    }

    function showPreloader(text) {
        preloader.querySelector('.preloader-text').textContent = text || 'Loading...';
        preloader.style.display = 'flex';
    }

    function hidePreloader() {
        preloader.style.display = 'none';
    }

    function showAlert(message, type = 'success') {
        const msg = alertBox.querySelector('.msg');
        const icon = alertBox.querySelector('i');

        msg.textContent = message;

        if (type === 'error') {
            alertBox.style.background = '#f8d7da';
            alertBox.style.borderLeft = '6px solid #dc3545';
            icon.className = 'bx bx-error-circle';
            msg.style.color = '#721c24';
        } else {
            alertBox.style.background = '#d4edda';
            alertBox.style.borderLeft = '6px solid #28a745';
            icon.className = 'bx bx-check-circle';
            msg.style.color = '#155724';
        }

        alertBox.classList.add('show');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideAlert();
        }, 5000);
    }

    function hideAlert() {
        alertBox.classList.remove('show');
        alertBox.classList.add('hide');

        setTimeout(() => {
            alertBox.classList.remove('hide');
        }, 800);
    }

    // Add keyboard support for editable fields
    editableFields.forEach(field => {
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                field.blur();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const editBtn = document.getElementById('editProfileBtn');
    const preloader = document.getElementById('preloader');
    const alertBox = document.getElementById('alert');
    const closeBtn = document.querySelector('.close-btn');
    const profileImageButton = document.getElementById('profileImageButton');
    
    // Form field mappings
    const editableFields = {
        fullName: 'editFullName',
        dob: 'editDob',
        phone: 'editPhone',
        gender: 'editGender',
        bloodType: 'editBloodType',
        location: 'editLocation',
        lastDonation: 'editLastDonation',
        healthConditions: 'editHealthConditions'
    };

    let isEditMode = false;
    let originalValues = {};

    // Initial Load
    loadUserData();
    setupEventListeners();

    function loadUserData() {
        // Load from localStorage
        Object.entries(editableFields).forEach(([key, id]) => {
            const savedValue = localStorage.getItem(key);
            if (savedValue) {
                document.getElementById(key).textContent = savedValue;
                document.getElementById(id).value = savedValue;
            }
        });

        // Load profile image
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            updateProfileImage(savedImage);
        }
    }

    function setupEventListeners() {
        // Edit/Save Button
        editBtn.addEventListener('click', handleEditSave);

        // Profile Image Upload
        profileImageButton.addEventListener('click', handleProfileImageUpload);

        // Close Alert
        closeBtn.addEventListener('click', hideAlert);
    }

    function handleEditSave() {
        if (!isEditMode) {
            enterEditMode();
        } else {
            saveChanges();
        }
    }

    function enterEditMode() {
        isEditMode = true;
        document.body.classList.add('edit-mode');
        editBtn.innerHTML = `<i class='bx bx-save'></i> Save Changes`;
        
        // Store original values
        Object.entries(editableFields).forEach(([key, id]) => {
            originalValues[key] = document.getElementById(key).textContent;
        });
    }

    function saveChanges() {
        showPreloader('Saving changes...');
        
        try {
            // Update values and save to localStorage
            Object.entries(editableFields).forEach(([key, id]) => {
                const newValue = document.getElementById(id).value;
                document.getElementById(key).textContent = newValue;
                localStorage.setItem(key, newValue);
            });

            // Update profile header
            document.getElementById('profileName').textContent = 
                document.getElementById('fullName').textContent;
            document.getElementById('profileBloodType').textContent = 
                document.getElementById('bloodType').textContent;

            showAlert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            showAlert('Error saving changes. Please try again.', 'error');
        } finally {
            exitEditMode();
            hidePreloader();
        }
    }

    function exitEditMode() {
        isEditMode = false;
        document.body.classList.remove('edit-mode');
        editBtn.innerHTML = `<i class='bx bx-edit-alt'></i> Edit Profile`;
    }

    async function handleProfileImageUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = async(e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    showPreloader('Updating profile picture...');
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        localStorage.setItem('profileImage', e.target.result);
                        updateProfileImage(e.target.result);
                    };
                    reader.readAsDataURL(file);

                    await new Promise(resolve => setTimeout(resolve, 1500));
                    showAlert('Profile picture updated!');
                } catch (error) {
                    console.error('Error updating profile image:', error);
                    showAlert('Error updating profile picture', 'error');
                } finally {
                    hidePreloader();
                }
            }
        };
        input.click();
    }

    function updateProfileImage(imageUrl) {
        const profileContent = document.querySelector('.profile-image-content');
        profileContent.innerHTML = `
            <img src="${imageUrl}" alt="Profile" class="profile-image">
            ${document.querySelector('.profile-image-overlay').outerHTML}
        `;
    }

    // UI Helpers
    function showPreloader(text) {
        preloader.querySelector('.preloader-text').textContent = text;
        preloader.style.display = 'flex';
    }

    function hidePreloader() {
        preloader.style.display = 'none';
    }

    function showAlert(message, type = 'success') {
        const msg = alertBox.querySelector('.msg');
        const icon = alertBox.querySelector('i');

        // Style based on type
        alertBox.style.background = type === 'error' ? '#f8d7da' : '#d4edda';
        alertBox.style.borderLeftColor = type === 'error' ? '#dc3545' : '#28a745';
        icon.className = type === 'error' ? 'bx bx-error-circle' : 'bx bx-check-circle';
        msg.style.color = type === 'error' ? '#721c24' : '#155724';
        msg.textContent = message;

        alertBox.classList.add('show');
        setTimeout(hideAlert, 5000);
    }

    function hideAlert() {
        alertBox.classList.remove('show');
    }
});
