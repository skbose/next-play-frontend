import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the Navbar CSS file

const Navbar = ({ isAuthenticated, logout }) => {
    return (
        <div className="navbar">
            <img src="/images/CAMPUSHIRE-removebg-preview.png" alt="Portal Icon" className="icon" />
            <div className="buttons">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">
                            <button className="btn">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn">Register</button>
                        </Link>
                    </>
                ) : (
                    <button className="btn" onClick={logout}>Logout</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
