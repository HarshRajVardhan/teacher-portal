document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerButton = document.getElementById('register-button');
    const loginButton = document.getElementById('login-button');

    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = '/register.html';
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = '/index.html';
        });
    }
});

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => res.json());

    if (result.token) {
        localStorage.setItem('authToken', result.token);
        window.location.href = '/dashboard.html';
    } else {
        document.getElementById('error-message').textContent = result.msg || 'An error occurred';
    }
}

async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    }).then((res) => res.json());

    if (result.token) {
        localStorage.setItem('authToken', result.token);
        window.location.href = '/index.html';
    } else {
        document.getElementById('register-message').textContent = result.msg || 'An error occurred';
    }
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}
