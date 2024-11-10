import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

const Login = ({ login }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            user_id: userId,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();

                // Store tokens and user type in localStorage
                localStorage.setItem('accessToken', data.access); // JWT access token
                localStorage.setItem('refreshToken', data.refresh); // JWT refresh token
                localStorage.setItem('userType', data.user_type); // recruiter or candidate
                localStorage.setItem('username', data.username); // Store the recruiter name (username)

                login();

                alert(`Login successful! Welcome, ${data.username}.`);

                // Redirect based on user type
                if (data.user_type === 'candidate') {
                    navigate('/student-portal');
                } else if (data.user_type === 'recruiter') {
                    navigate('/recruiter-portal');
                }
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>
                <div className="login-form-group">
                    <label>User ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        className="login-input-field"
                    />
                </div>
                <div className="login-form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input-field"
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
                <div className="account">
                    <p>
                        Don't have a CampusHire account?
                    </p>
                    <Link to="/register">
                        <p className="login1" style={{ marginLeft: '5px', color: '#309bae', textDecoration: 'underline' }}>
                            Sign Up
                        </p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
