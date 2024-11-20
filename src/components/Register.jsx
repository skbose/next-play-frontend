import React, { useState } from 'react';
import '../styles/Register.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedUserType, setSelectedUserType] = useState(''); // State to store selected user type
    const [showForm, setShowForm] = useState(false); // State to control form visibility
    const navigate = useNavigate();

    const handleUserTypeSelection = (type) => {
        // For student type, set the user_type as 'candidate' if that's expected by backend
        const userType = type === 'student' ? 'candidate' : 'recruiter';
        setSelectedUserType(userType);
        setShowForm(true); // Show the form after selecting a type
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const formData = {
            user_id: userId,
            password,
            user_type: selectedUserType, // Use the selected user type ('candidate' or 'recruiter')
            email,
            name
        };

        try {
            const response = await fetch('http://localhost:8000/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error response:', errorData);
                alert(`Registration failed: ${errorData.user_id || errorData.message || 'Unknown error'}`);
            } else {
                const data = await response.json();
                alert(`Registration successful for user: ${data.name}`);
                navigate('/');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            {!showForm ? (
                // Step 1: Show user type selection cards
                <div className="user-type-selection">
                    <h3 className="account">Join as a Student Or Recruiter</h3>
                    <div className="user-type-cards-wrapper">
                        <div className="user-type-cards">
                            <div className="card" onClick={() => handleUserTypeSelection('student')}>
                                <h4>Student</h4>
                                <p>Create a student account to explore educational opportunities.</p>
                            </div>
                            <div className="card" onClick={() => handleUserTypeSelection('recruiter')}>
                                <h4>Recruiter</h4>
                                <p>Create a recruiter account to post jobs and hire talents.</p>
                            </div>
                        </div>
                        <div className="account-login">
                            <h5 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Already have an account?
                                <Link to="/login">
                                    <p className="login1" style={{ marginLeft: '5px', color: '#309bae', textDecoration: 'underline' }}>
                                        Login
                                    </p>
                                </Link>
                            </h5>
                        </div>
                    </div>
                </div>
            ) : (
                // Step 2: Show registration form after selecting user type
                <form onSubmit={handleSubmit} className="register-form">
                    <h2 className="register-title">Register as {selectedUserType === 'candidate' ? 'Student' : 'Recruiter'}</h2>
                    <div className="register-form-group">
                        <label>User ID</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            className="register-input-field"
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="register-input-field"
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input-field"
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input-field"
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="register-input-field"
                        />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
            )}
        </div>
    );
};

export default Register;
