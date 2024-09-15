document.addEventListener('DOMContentLoaded', function() {
    // Handle Login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const user_id = document.getElementById('user_id').value;
        const password = document.getElementById('password').value;
  
        const response = await fetch('http://localhost:8000/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, password })
        });
  
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access);  // Store the JWT token
            localStorage.setItem('refresh_token', data.refresh);  // Store refresh token
  
            // Redirect based on user_type
            if (data.user_type === 'candidate') {
                window.location.href = 'candidate_landing.html';
            } else if (data.user_type === 'recruiter') {
                window.location.href = 'recruiter_landing.html';
            }
        } else {
            alert('Invalid login credentials');
        }
    });
  
    // Handle Registration
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const user_id = document.getElementById('user_id').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        const user_type = document.getElementById('user_type').value;
  
        const response = await fetch('http://localhost:8000/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, email, password, name, user_type },
                console.log(body)
            )
        });
  
        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'index.html';  // Redirect to login page after registration
        } else {
            alert('Registration failed!');
        }
    });
  });