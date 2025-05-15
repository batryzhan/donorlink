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
    
    // Profile elements
    const profileName = document.getElementById('profileName');
    const profileBloodType = document.getElementById('profileBloodType');
    const profileLocation = document.getElementById('profileLocation');
    const fullNameElement = document.getElementById('fullName');
    const dobElement = document.getElementById('dob');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const genderElement = document.getElementById('gender');
    const bloodTypeElement = document.getElementById('bloodType');
    const lastDonationDateElement = document.getElementById('lastDonationDate');
    const eligibleElement = document.getElementById('eligible');
    const healthConditionsElement = document.getElementById('healthConditions');
    
    // Statistics elements
    const donationsCountElement = document.getElementById('donationsCount');
    const livesSavedElement = document.getElementById('livesSaved');
    const lastDonationElement = document.getElementById('lastDonation');
    
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
        // Check if we have donor data from the donations form
        const donorFullName = localStorage.getItem('donorFullName');
        const donorAge = localStorage.getItem('donorAge');
        const donorGender = localStorage.getItem('donorGender');
        const donorFullBloodType = localStorage.getItem('donorFullBloodType');
        const donorCity = localStorage.getItem('donorCity');
        const donorContact = localStorage.getItem('donorContact');
        const donorEligible = localStorage.getItem('donorEligible');
        const lastDonationDate = localStorage.getItem('lastDonationDate');
        const donationCount = localStorage.getItem('donationCount') || '0';
        
        // Update profile with donor data if available
        if (donorFullName) {
            profileName.textContent = donorFullName;
            fullNameElement.textContent = donorFullName;
            if (formFields.fullName.edit) formFields.fullName.edit.value = donorFullName;
        }
        
        if (donorFullBloodType) {
            profileBloodType.textContent = donorFullBloodType;
            bloodTypeElement.textContent = donorFullBloodType;
            if (formFields.bloodType.edit) {
                // Find and select the matching option
                const options = formFields.bloodType.edit.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === donorFullBloodType) {
                        formFields.bloodType.edit.selectedIndex = i;
                        break;
                    }
                }
            }
        }
        
        if (donorCity) {
            profileLocation.textContent = donorCity;
            if (formFields.location.edit) {
                // Try to find matching option or set to "Other"
                const options = formFields.location.edit.options;
                let found = false;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === donorCity) {
                        formFields.location.edit.selectedIndex = i;
                        found = true;
                        break;
                    }
                }
                if (!found && options.length > 0) {
                    // Set to "Other" if available
                    for (let i = 0; i < options.length; i++) {
                        if (options[i].value === "Other") {
                            formFields.location.edit.selectedIndex = i;
                            break;
                        }
                    }
                }
            }
        }
        
        if (donorGender) {
            let displayGender = donorGender;
            if (donorGender === 'male') displayGender = 'Ер';
            else if (donorGender === 'female') displayGender = 'Әйел';
            else if (donorGender === 'other') displayGender = 'Басқа';
            
            genderElement.textContent = displayGender;
            
            if (formFields.gender.edit) {
                // Find and select the matching option
                const options = formFields.gender.edit.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value.toLowerCase() === donorGender) {
                        formFields.gender.edit.selectedIndex = i;
                        break;
                    }
                }
            }
        }
        
        if (donorContact) {
            phoneElement.textContent = donorContact;
            if (formFields.phone.edit) formFields.phone.edit.value = donorContact;
        }
        
        if (donorAge) {
            // Calculate approximate birth year based on age
            const currentYear = new Date().getFullYear();
            const birthYear = currentYear - parseInt(donorAge);
            const approximateDob = `${birthYear}-01-01`;
            
            dobElement.textContent = approximateDob;
            if (formFields.dob.edit) formFields.dob.edit.value = approximateDob;
        }
        
        // Update eligibility status
        if (donorEligible === 'true') {
            eligibleElement.textContent = 'Жарамды';
            eligibleElement.style.color = '#2ecc71';
        } else if (donorEligible === 'false') {
            eligibleElement.textContent = 'Жарамсыз';
            eligibleElement.style.color = '#e74c3c';
        }
        
        // Update last donation date
        if (lastDonationDate) {
            const donationDate = new Date(lastDonationDate);
            const formattedDate = donationDate.toLocaleDateString('kk-KZ');
            lastDonationDateElement.textContent = formattedDate;
            
            // Calculate months since last donation
            const currentDate = new Date();
            const monthsDiff = Math.floor((currentDate - donationDate) / (1000 * 60 * 60 * 24 * 30));
            lastDonationElement.textContent = monthsDiff > 0 ? monthsDiff : 0;
        }
        
        // Update donation statistics
        if (donationCount) {
            donationsCountElement.textContent = donationCount;
            
            // Calculate approximate lives saved (1 donation can help up to 3 people)
            const livesSaved = parseInt(donationCount) * 3;
            livesSavedElement.textContent = livesSaved;
        }
        
        // Load profile image if exists
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            updateProfileImage(savedImage);
        }
        
        // Load other saved data from localStorage (for fields not from donation form)
        Object.keys(formFields).forEach(key => {
            const savedValue = localStorage.getItem(key);
            if (savedValue && formFields[key].display && !formFields[key].display.textContent) {
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
    }
    
    function setupEventListeners() {
        // Edit Profile Button - Open modal
        if (editBtn) {
            editBtn.addEventListener('click', openEditProfileCard);
        }
        
        // Close buttons
        if (closeEditBtn) {
            closeEditBtn.addEventListener('click', closeEditProfileCard);
        }
        
        if (cancelEditBtn) {
            cancelEditBtn.addEventListener('click', closeEditProfileCard);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeEditProfileCard);
        }
        
        // Save button
        if (saveEditBtn) {
            saveEditBtn.addEventListener('click', saveProfileChanges);
        }
        
        // Profile Image Upload
        if (profileImageButton) {
            profileImageButton.addEventListener('click', handleProfileImageUpload);
        }
        
        // Close Alert
        if (closeBtn) {
            closeBtn.addEventListener('click', hideAlert);
        }
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
            profileName.textContent = formFields.fullName.edit.value;
            
            // Update blood type in header
            profileBloodType.textContent = formFields.bloodType.edit.value;
            
            // Also update donor data in localStorage
            localStorage.setItem('donorFullName', formFields.fullName.edit.value);
            localStorage.setItem('donorFullBloodType', formFields.bloodType.edit.value);
            localStorage.setItem('donorCity', formFields.location.edit.value);
            
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
        if (!preloader) return;
        const preloaderText = preloader.querySelector('.preloader-text');
        if (preloaderText) {
            preloaderText.textContent = text || 'Loading...';
        }
        preloader.style.display = 'flex';
    }
    
    function hidePreloader() {
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    function showAlert(message, type = 'success') {
        if (!alertBox) return;
        
        const msg = alertBox.querySelector('.msg');
        const icon = alertBox.querySelector('i');
        
        if (msg) msg.textContent = message;
        
        if (type === 'error') {
            alertBox.style.background = '#f8d7da';
            alertBox.style.borderLeft = '6px solid #dc3545';
            if (icon) icon.className = 'bx bx-error-circle';
            if (msg) msg.style.color = '#721c24';
        } else {
            alertBox.style.background = '#d4edda';
            alertBox.style.borderLeft = '6px solid #28a745';
            if (icon) icon.className = 'bx bx-check-circle';
            if (msg) msg.style.color = '#155724';
        }
        
        alertBox.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideAlert();
        }, 5000);
    }
    
    function hideAlert() {
        if (!alertBox) return;
        
        alertBox.classList.remove('show');
        alertBox.classList.add('hide');
        
        setTimeout(() => {
            alertBox.classList.remove('hide');
        }, 800);
    }
    
    // Add achievement badges based on donation count
    function updateAchievements() {
        const donationCount = parseInt(localStorage.getItem('donationCount') || '0');
        const achievementsContainer = document.querySelector('.achievements');
        
        if (!achievementsContainer) return;
        
        // Clear existing achievements
        achievementsContainer.innerHTML = '';
        
        // First-time donor badge (always show if donated at least once)
        if (donationCount >= 1) {
            const firstTimeBadge = document.createElement('div');
            firstTimeBadge.className = 'achievement-badge';
            firstTimeBadge.innerHTML = '<i class="bx bxs-medal"></i><span>Алғашқы рет донор болған</span>';
            achievementsContainer.appendChild(firstTimeBadge);
        }
        
        // Regular donor badge (3+ donations)
        if (donationCount >= 3) {
            const regularBadge = document.createElement('div');
            regularBadge.className = 'achievement-badge';
            regularBadge.innerHTML = '<i class="bx bxs-trophy"></i><span>Тұрақты донор</span>';
            achievementsContainer.appendChild(regularBadge);
        }
        
        // Hero donor badge (5+ donations)
        if (donationCount >= 5) {
            const heroBadge = document.createElement('div');
            heroBadge.className = 'achievement-badge';
            heroBadge.innerHTML = '<i class="bx bxs-heart"></i><span>Қаһарман донор</span>';
            achievementsContainer.appendChild(heroBadge);
        }
        
        // Lifesaver badge (10+ donations)
        if (donationCount >= 10) {
            const lifesaverBadge = document.createElement('div');
            lifesaverBadge.className = 'achievement-badge';
            lifesaverBadge.style.background = '#fef3c7';
            lifesaverBadge.style.color = '#92400e';
            lifesaverBadge.innerHTML = '<i class="bx bxs-star"></i><span>Өмір құтқарушы</span>';
            achievementsContainer.appendChild(lifesaverBadge);
        }
    }
    
    // Call this function to update achievements
    updateAchievements();
});
