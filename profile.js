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
