// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', 
        hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const successMessage = document.getElementById('success-message');

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const showError = (input, errorElement, message) => {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
};

const hideError = (input, errorElement) => {
    input.classList.remove('error');
    errorElement.style.display = 'none';
};

// Real-time validation
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, 'Please enter your name');
    } else {
        hideError(nameInput, nameError);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'Please enter your email');
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
    } else {
        hideError(emailInput, emailError);
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() === '') {
        showError(messageInput, messageError, 'Please enter your message');
    } else {
        hideError(messageInput, messageError);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, 'Please enter your name');
        isValid = false;
    }
    
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'Please enter your email');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (messageInput.value.trim() === '') {
        showError(messageInput, messageError, 'Please enter your message');
        isValid = false;
    }
    
    if (isValid) {
        // In a real application, you would send the form data to a server here
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});