// Event Handling Section

// Button Click Event
const clickBtn = document.getElementById('clickBtn');
const clickOutput = document.getElementById('clickOutput');
let clickCount = 0;

clickBtn.addEventListener('click', () => {
    clickCount++;
    clickOutput.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}`;
    clickBtn.classList.add('bounce');
    setTimeout(() => clickBtn.classList.remove('bounce'), 500);
});

// Hover Effects
const hoverBox = document.querySelector('.hover-box');
const hoverOutput = document.getElementById('hoverOutput');

hoverBox.addEventListener('mouseenter', () => {
    hoverOutput.textContent = 'Hover state: active';
    hoverOutput.style.color = 'green';
});

hoverBox.addEventListener('mouseleave', () => {
    hoverOutput.textContent = 'Hover state: inactive';
    hoverOutput.style.color = 'inherit';
});

// Keypress Detection
const keypressInput = document.getElementById('keypressInput');
const keypressOutput = document.getElementById('keypressOutput');

keypressInput.addEventListener('keydown', (e) => {
    keypressOutput.textContent = `Last key pressed: ${e.key} (Code: ${e.code})`;
});

// Secret Action (Double Click)
const secretBox = document.getElementById('secretBox');

secretBox.addEventListener('dblclick', () => {
    secretBox.classList.add('activated');
    secretBox.textContent = '🎉 Congratulations! You found the secret! 🎉';
    setTimeout(() => {
        secretBox.classList.remove('activated');
        secretBox.textContent = 'Double click me for a surprise!';
    }, 3000);
});

// Interactive Elements Section

// Color Changing Button
const colorChanger = document.getElementById('colorChanger');
const colors = ['#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', '#f72585', '#7209b7'];
let colorIndex = 0;

colorChanger.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    colorChanger.style.backgroundColor = colors[colorIndex];
    colorChanger.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
});

// Image Slideshow
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// Auto-advance slideshow every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Accordion
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Close all accordion items first
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle icons for all buttons
        document.querySelectorAll('.accordion-btn i').forEach(icon => {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        });
        
        // Open current item if it wasn't active
        if (!isActive) {
            content.classList.add('active');
            btn.querySelector('i').classList.remove('fa-chevron-down');
            btn.querySelector('i').classList.add('fa-chevron-up');
        }
    });
});

// Form Validation
const form = document.getElementById('validationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Real-time validation
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);

function validateUsername() {
    if (username.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        username.classList.add('shake');
        setTimeout(() => username.classList.remove('shake'), 500);
        return false;
    } else {
        usernameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        email.classList.add('shake');
        setTimeout(() => email.classList.remove('shake'), 500);
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    let isValid = true;
    
    // Check length
    const lengthRule = document.getElementById('lengthRule');
    if (password.value.length >= 8) {
        lengthRule.classList.add('valid');
    } else {
        lengthRule.classList.remove('valid');
        isValid = false;
    }
    
    // Check for number
    const numberRule = document.getElementById('numberRule');
    if (/\d/.test(password.value)) {
        numberRule.classList.add('valid');
    } else {
        numberRule.classList.remove('valid');
        isValid = false;
    }
    
    // Check for special character
    const specialRule = document.getElementById('specialRule');
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
        specialRule.classList.add('valid');
    } else {
        specialRule.classList.remove('valid');
        isValid = false;
    }
    
    if (!isValid) {
        passwordError.textContent = 'Password does not meet requirements';
        password.classList.add('shake');
        setTimeout(() => password.classList.remove('shake'), 500);
    } else {
        passwordError.textContent = '';
    }
    
    return isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isUsernameValid && isEmailValid && isPasswordValid) {
        alert('Form submitted successfully!');
        form.reset();
        document.querySelectorAll('.rule').forEach(rule => rule.classList.remove('valid'));
    } else {
        alert('Please fix the errors in the form');
    }
});