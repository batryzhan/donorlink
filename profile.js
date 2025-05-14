document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const editBtn = document.getElementById('editProfileBtn');
    const editProfileCard = document.getElementById('editProfileCard');
    const overlay = document.getElementById('overlay');
    const closeEditBtn = document.getElementById('closeEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const preloader = document.getElementById('preloader');
    const alertBox = document.getElementById('alert');
    const closeBtn = document.querySelector('.close-btn');
    const profileImageButton = document.getElementById('profileImageButton');
    
    // Form fields
    const formFields = {
        fullName: {
            display: document.getElementById('fullName'),
            edit: document.getElementById('editCardFullName')
        },
        gender: {
            display: document.getElementById('gender'),
            edit: document.getElementById('editCardGender')
        },
        phone: {
            display: document.getElementById('phone'),
            edit: document.getElementById('editCardPhone')
        },
        dob: {
            display: document.getElementById('dob'),
            edit: document.getElementById('editCardDob')
        },
        bloodType: {
            display: document.getElementById('bloodType'),
            edit: document.getElementById('editCardBloodType')
        },
        location: {
            display: document.getElementById('profileLocation'),
            edit: document.getElementById('editCardLocation')
        }
    };
    
    // Load saved user data
    loadUserData();
    
    // Setup event listeners
    setupEventListeners();
    
    function loadUserData() {
        // Load data from localStorage
        Object.keys(formFields).forEach(key => {
            const savedValue = localStorage.getItem(key);
            if (savedValue && formFields[key].display) {
                formFields[key].display.textContent = savedValue;
                
                // Also set the form field value if it exists
                if (formFields[key].edit) {
                    if (formFields[key].edit.tagName === 'SELECT') {
                        // For select elements, find and select the option
                        const options = formFields[key].edit.options;
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].value === savedValue) {
                                formFields[key].edit.selectedIndex = i;
                                break;
                            }
                        }
                    } else {
                        // For other input types
                        formFields[key].edit.value = savedValue;
                    }
                }
            }
        });
        
        // Update profile name in header
        const savedName = localStorage.getItem('fullName');
        if (savedName) {
            document.getElementById('profileName').textContent = savedName;
        }
        
        // Update blood type in header
        const savedBloodType = localStorage.getItem('bloodType');
        if (savedBloodType) {
            document.getElementById('profileBloodType').textContent = savedBloodType;
        }
        
        // Load profile image
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            updateProfileImage(savedImage);
        }
    }
    
    function setupEventListeners() {
        // Edit Profile Button - Open modal
        editBtn.addEventListener('click', openEditProfileCard);
        
        // Close buttons
        closeEditBtn.addEventListener('click', closeEditProfileCard);
        cancelEditBtn.addEventListener('click', closeEditProfileCard);
        overlay.addEventListener('click', closeEditProfileCard);
        
        // Save button
        saveEditBtn.addEventListener('click', saveProfileChanges);
        
        // Profile Image Upload
        profileImageButton.addEventListener('click', handleProfileImageUpload);
        
        // Close Alert
        closeBtn.addEventListener('click', hideAlert);
    }
    
    function openEditProfileCard() {
        // Populate form fields with current values
        Object.keys(formFields).forEach(key => {
            if (formFields[key].display && formFields[key].edit) {
                if (formFields[key].edit.tagName === 'SELECT') {
                    // For select elements, we already set this in loadUserData
                } else {
                    // For other input types
                    formFields[key].edit.value = formFields[key].display.textContent;
                }
            }
        });
        
        // Show the modal and overlay
        editProfileCard.classList.add('active');
        overlay.style.display = 'block';
    }
    
    function closeEditProfileCard() {
        editProfileCard.classList.remove('active');
        overlay.style.display = 'none';
    }
    
    async function saveProfileChanges() {
        try {
            showPreloader('Saving changes...');
            
            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Update display values and save to localStorage
            Object.keys(formFields).forEach(key => {
                if (formFields[key].display && formFields[key].edit) {
                    const newValue = formFields[key].edit.value;
                    formFields[key].display.textContent = newValue;
                    localStorage.setItem(key, newValue);
                }
            });
            
            // Update profile name in header
            document.getElementById('profileName').textContent = formFields.fullName.edit.value;
            
            // Update blood type in header
            document.getElementById('profileBloodType').textContent = formFields.bloodType.edit.value;
            
            showAlert('Profile updated successfully!');
            closeEditProfileCard();
        } catch (error) {
            console.error('Error saving profile:', error);
            showAlert('Error saving changes. Please try again.', 'error');
        } finally {
            hidePreloader();
        }
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
                    
                    // Read the file as data URL
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageUrl = e.target.result;
                        localStorage.setItem('profileImage', imageUrl);
                        updateProfileImage(imageUrl);
                    };
                    reader.readAsDataURL(file);
                    
                    // Simulate upload delay
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
        const existingImg = profileContent.querySelector('img');
        const profileIcon = profileContent.querySelector('.profile-image-icon');
        
        if (existingImg) {
            existingImg.src = imageUrl;
        } else {
            // Create new image element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "Profile";
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            
            // Hide the icon and add the image
            if (profileIcon) profileIcon.style.display = 'none';
            profileContent.prepend(img);
        }
    }
    
    // UI Helpers
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
});
