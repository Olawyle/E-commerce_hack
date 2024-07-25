function CustomAlert(message, callback) {

    // alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert';

    // alert message
    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;
    alertContainer.appendChild(alertMessage);

    // close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.className = 'custom-alert-button';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(alertContainer);
        if (callback) callback();
    });
    alertContainer.appendChild(closeButton);

    // Append alert to body
    document.body.appendChild(alertContainer);

    // Automatically remove the alert after 3 seconds 
    setTimeout(() => {
        if (document.body.contains(alertContainer)) {
            document.body.removeChild(alertContainer);
            if (callback) callback();
        }
    }, 3000);
}

// Function to handle signup form submission
function handleSignup(event) {
    event.preventDefault();

    const firstName = document.getElementById('inputFirstName').value.trim();
    const lastName = document.getElementById('inputLastName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value.trim();

    function validateEmail(email) {
        const regex1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex1.test(String(email).toLowerCase());
    }

    if (!validateEmail(email)) {
        displayError('inputEmail', 'Please enter a valid email address.', 3000);
        return;
    } else {
        clearError('inputEmail');
    }

    function validatePassword(password) {
        const regex2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}\-\[\]:;<,>.?\/\\])(?=.*[a-zA-Z]).{8,}$/;
        return regex2.test(password);
    }

    if (!validatePassword(password)) {
        displayError('inputPassword', 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.', 3000);
        return;
    } else {
        clearError('inputPassword');
    }

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        displayError('inputEmail', 'This email is already registered.', 3000);
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    CustomAlert('Sign up successful! Please log in.', function() {
        window.location.href = 'mlogin.html';
    });
}

// Function to display error messages
function displayError(inputId, message, duration) {
    const inputField = document.getElementById(inputId);
    clearError(inputId);  // Clear existing error if any
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    inputField.parentNode.appendChild(errorMessage);
    inputField.classList.add('error');

    // Remove the error message after the specified time
    setTimeout(() => {
        clearError(inputId);
    }, duration);
}

// Function to clear error messages
function clearError(inputId) {
    const inputField = document.getElementById(inputId);
    const errorMessage = inputField.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    inputField.classList.remove('error');
}

// Event listener for form submission
document.getElementById('signupForm').addEventListener('submit', handleSignup );
