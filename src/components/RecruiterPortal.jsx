import React, { useState, useEffect } from 'react';
import "../styles/RecruiterPortal.css";
import { useNavigate } from 'react-router-dom';

const RecruiterPortal = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the username from localStorage when the component mounts
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data object
        const formData = new FormData();
        formData.append('email', email);
        formData.append('description', description);
        formData.append('title', title);
        formData.append('attachment', attachment);

        setIsSubmitting(true);
        setMessage('');

        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch('http://localhost:8000/portal/create-job/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setMessage('Job created successfully!');
                setEmail('');
                setTitle('');
                setDescription('');
                setAttachment(null);
            } else {
                const errorData = await response.json();
                setMessage(`Failed to create job: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during job creation:', error);
            setMessage('An error occurred while creating the job. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleViewJobs = () => {
        const token = localStorage.getItem('accessToken');
        navigate('/view-jobs', { 
            state: { 
                username,
                token 
            } 
        });
    };


    return (
        <div className="recruiter-container">
            <h1 className="welcome-message">Welcome, {username}</h1>
            <div class="button-container">
                <button onClick={handleViewJobs} className="view-jobs-btn">
                    View Created Jobs
                </button>
            </div>
            <form onSubmit={handleSubmit} className="recruiter-form">
                <div className="recruiter-form-group">
                    <label>Email body:</label>
                    <textarea
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="recruiter-input-field"
                    ></textarea>
                </div>

                <div className="recruiter-form-group">
                    <label>Job Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="recruiter-input-field"
                    />
                </div>

                <div className="recruiter-form-group">
                    <label>Job Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="recruiter-input-field job-description"
                    ></textarea>
                </div>

                <div className="recruiter-form-group">
                    <label>Attachment:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        className="recruiter-input-field"
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="recruiter-btn">
                    {isSubmitting ? 'Creating Job...' : 'Create Job'}
                </button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default RecruiterPortal;
