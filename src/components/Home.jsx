import React from 'react';
import '../styles/Home.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Student Recruiter Portal</h1>
            <p className="tagline">Find Your Dream Job Now!</p>

            <div className="intro">
                <h2>Connecting Students with Opportunities</h2>
                <p>
                    Our platform bridges the gap between students and recruiters.
                    Explore job listings, internships, and career resources tailored just for you.
                </p>
            </div>

            <div className="features">
                <h2>Features</h2>
                <ul>
                    <li>🔍 **Job Search**: Discover job openings across various fields.</li>
                    <li>📄 **Resume Builder**: Create a professional resume with ease.</li>
                    <li>🤝 **Networking**: Connect with industry professionals and recruiters.</li>
                    <li>📚 **Career Resources**: Access articles, webinars, and guides to enhance your skills.</li>
                </ul>
            </div>

            <div className="cta">
                <h2>Get Started Today!</h2>
                <p>Join us now to unlock a world of opportunities!</p>
                <Link to="/register">
                    <button className="btn">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;