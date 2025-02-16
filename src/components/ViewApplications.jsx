import React, { useState, useEffect } from 'react';
import '../styles/ViewApplications.css'; // Ensure this path is correct
import config from '../config';

const ApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {

        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const apiUrl = `${config.API_URL}/portal/recruiter/applications/`;
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                } else {
                    throw new Error('Failed to fetch applications');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return <div>Loading applications...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="applications-container">
            <h2>Applications</h2>
            {applications.length === 0 ? (
                <p>No applications available.</p>
            ) : (
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Resume</th>
                            <th>Email</th>
                            <th>Experience Summary</th>
                            <th>Submitted At</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application, index) => (
                            <tr key={index}>
                                <td><a href={application.resume_url} target="_blank" rel="noopener noreferrer">View Resume</a></td>
                                <td>{application.email_id}</td>
                                <td>{application.experience_summary}</td>
                                <td>{new Date(application.applied_at).toLocaleDateString()}</td>
                                <td>{application.contact_no}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ApplicationsPage;
