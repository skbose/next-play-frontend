import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the Navbar CSS file

const Navbar = ({ isAuthenticated, logout, userType }) => {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // To navigate on logout
    const isHomePage = location.pathname === '/';

    // Determine the home route based on user type
    const getHomeRoute = () => {
        if (!isAuthenticated) return '/';
        return userType === 'recruiter' ? '/recruiter-portal' : '/candidate-portal';
    };

    const handleLogout = () => {
        // Call the logout function passed as a prop
        logout();
        // Redirect to the homepage
        navigate('/');
    };

    return (
        <div className="navbar">
            <Link to={getHomeRoute()}>
                <img src="/images/CAMPUSHIRE-removebg-preview.png" alt="Portal Icon" className="icon" />
            </Link>
            {!isHomePage && (
                <div className="buttons">
                    {isAuthenticated ? (
                        // Show the Logout button if authenticated
                        <button className="btn" onClick={handleLogout}>Logout</button>
                    ) : (
                        // Show the Login and Register buttons for other cases
                        <>
                            <Link to="/login">
                                <button className="btn">Login</button>
                            </Link>
                            {location.pathname !== '/register' && (
                                <Link to="/register">
                                    <button className="btn">Register</button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
