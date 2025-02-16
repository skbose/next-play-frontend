import React, { useState, useEffect } from 'react';
import "../styles/StudentPortal.css"
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import config from '../config';

const StudentPortal = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [experienceSummary, setExperienceSummary] = useState('');
    const [resume, setResume] = useState(null);
    const [emailId, setEmailId] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // Save the current URL including jobId to localStorage
            localStorage.setItem('redirectAfterLogin', location.pathname);
            navigate('/login');
        }
    }, [navigate, location.pathname]);





    useEffect(() => {
        // Retrieve the username from localStorage when the component mounts
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);





    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('experience_summary', experienceSummary);
        formData.append('resume', resume);
        formData.append('email_id', emailId);
        formData.append('contact_no', contactNo);

        try {
            const response = await fetch(`${config.API_URL}/portal/apply-job/${jobId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to apply for the job');
            }

            const data = await response.json();
            setMessage('Job application submitted successfully!');
            console.log(data);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Error applying for the job:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="student-portal-container">
            <h1 className="welcome-message">Welcome, {username}</h1>
            <form onSubmit={handleSubmit} className="student-portal-form">
                <div className="form-group">
                    <label htmlFor="experienceSummary">Experience Summary</label>
                    <textarea
                        id="experienceSummary"
                        value={experienceSummary}
                        onChange={(e) => setExperienceSummary(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Upload Resume</label>
                    <input
                        type="file"
                        id="resume"
                        onChange={(e) => setResume(e.target.files[0])}
                        accept=".pdf,.doc,.docx"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailId">Email ID</label>
                    <input
                        type="email"
                        id="emailId"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNo">Contact Number</label>
                    <input
                        type="tel"
                        id="contactNo"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Apply for Job'}
                </button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default StudentPortal;
