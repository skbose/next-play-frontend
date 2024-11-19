import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the Navbar CSS file

const Navbar = ({ isAuthenticated, logout }) => {
    const location = useLocation(); // Get the current location

    return (
        <div className="navbar">
            <img src="/images/CAMPUSHIRE-removebg-preview.png" alt="Portal Icon" className="icon" />
            <div className="buttons">
                {!isAuthenticated ? (
                    <>
                        {/* Conditionally render the "Register" button only if the current path is not '/register' */}
                        <Link to="/login">
                            <button className="btn">Login</button>
                        </Link>
                        {location.pathname !== '/register' && (
                            <Link to="/register">
                                <button className="btn">Register</button>
                            </Link>
                        )}
                    </>
                ) : (
                    <button className="btn" onClick={logout}>Logout</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
