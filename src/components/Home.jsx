import React from 'react';
import '../styles/Home.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Lateral Hiring Portal</h1>
            <p className="tagline">Find Your Dream Job Now!</p>

            <div className="cta">
                <div className="button-group">
                    <Link to="/login">
                        <button className="btn">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;