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
        localStorage.setItem('user_id', data.user_id);
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