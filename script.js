document.addEventListener('DOMContentLoaded', function() {
    // Setup password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    togglePassword.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, togglePassword);
    });

    toggleConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
    });

    // Setup password strength meter
    passwordInput.addEventListener('input', updatePasswordStrength);

    // Format phone number as user types
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', formatPhoneNumber);

    // Set max date for birthdate (18 years ago)
    const birthdateInput = document.getElementById('birthdate');
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const maxDate = eighteenYearsAgo.toISOString().split('T')[0];
    birthdateInput.setAttribute('max', maxDate);
});

function togglePasswordVisibility(inputField, icon) {
    if (inputField.type === 'password') {
        inputField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        inputField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function formatPhoneNumber(e) {
    let input = e.target;
    let value = input.value.replace(/\D/g, '');
    
    // Only format if we have a + at the beginning
    if (input.value.startsWith('+')) {
        if (value.length > 0) {
            // Format as +XXX XXX XXXXX
            if (value.length <= 3) {
                input.value = '+' + value;
            } else if (value.length <= 6) {
                input.value = '+' + value.substring(0, 3) + ' ' + value.substring(3);
            } else {
                input.value = '+' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 11);
            }
        }
    }
}

function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    // Calculate strength
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    // Update UI
    strengthBar.style.width = strength + '%';
    
    if (strength <= 25) {
        strengthBar.style.backgroundColor = '#ef476f';
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#ef476f';
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = '#ffd166';
        strengthText.textContent = 'Fair';
        strengthText.style.color = '#ffd166';
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = '#06d6a0';
        strengthText.textContent = 'Good';
        strengthText.style.color = '#06d6a0';
    } else {
        strengthBar.style.backgroundColor = '#118ab2';
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#118ab2';
    }
}

function validateForm() {
    let isValid = true;
    resetErrors();

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (!/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž\s]{3,30}$/.test(name)) {
        showError('nameError', 'Name must be 3-30 letters without numbers or special symbols');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Birthday validation
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        showError('birthdateError', 'Please select your date of birth');
        isValid = false;
    } else {
        const birthYear = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        
        if (age < 18) {
            showError('birthdateError', 'You must be at least 18 years old');
            isValid = false;
        } else if (age > 120) {
            showError('birthdateError', 'Please enter a valid date of birth');
            isValid = false;
        }
    }

    // Phone number validation
    const phone = document.getElementById('phone').value.trim();
    if (!/^\+(\d{3}\s\d{3}\s\d{5}|\d{11})$/.test(phone)) {
        showError('phoneError', 'Please enter a valid phone number in format: +370 612 34567');
        isValid = false;
    }

    // Password validation
    const password = document.getElementById('password').value;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
        showError('passwordError', 'Password must be at least 8 characters with uppercase, lowercase, number and special character');
        isValid = false;
    }

    // Confirm password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    // Terms and conditions
    const termsCheck = document.getElementById('termsCheck');
    if (!termsCheck.checked) {
        showError('termsError', 'You must agree to the Terms and Conditions');
        isValid = false;
    }

    // Submit if valid
    if (isValid) {
        showSuccess();
        document.getElementById('registrationForm').reset();
        resetPasswordStrength();
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    
    // Highlight the input field
    const inputId = elementId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.style.borderColor = 'var(--error-color)';
    }
}

function resetErrors() {
    // Clear all error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    // Reset input highlighting
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach(element => {
        element.style.borderColor = 'var(--border-color)';
    });
    
    // Clear success message
    document.getElementById('successMessage').textContent = '';
}

function showSuccess() {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'Registration successful! Redirecting...';
    
    // Simulate redirection after 2 seconds
    setTimeout(() => {
        successMessage.textContent += ' ✓';
    }, 2000);
}

function resetPasswordStrength() {
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    strengthBar.style.width = '0%';
    strengthText.textContent = 'Password strength';
    strengthText.style.color = 'var(--text-light)';
}