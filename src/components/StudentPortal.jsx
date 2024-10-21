import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPortal = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token and user type from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userType');

        // Redirect to home page
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome to the Student Portal</h1>
            {/* Add your student portal content here */}
            <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StudentPortal;
