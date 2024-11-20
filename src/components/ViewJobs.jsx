import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ViewJobs.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const ViewJobs = () => {
    const location = useLocation();
    const { username } = location.state || { username: 'Guest' };
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem('accessToken'); // Get the token from localStorage

            try {
                const response = await fetch('http://localhost:8000/portal/jobs/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the request headers
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();
                console.log("Fetched jobs:", data); // Log the fetched jobs
                setJobs(data); // Assuming the API returns an array of jobs
            } catch (error) {
                console.error("Error fetching jobs:", error); // Log any errors
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading jobs...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    const handleViewApplications = () => {
        navigate('/view-applications', { state: { username } });  // Navigate to the "View Applications" page
    };

    return (
        <div className="recruiter-table">
            <h2>List of Jobs Created</h2>
            {jobs.length === 0 ? (
                <p>No jobs available.</p>
            ) : (
                <table className="jobs-table">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Description</th>
                            <th>Job Description</th>
                            <th>Job Applications</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.title}</td>
                                <td>{job.description}</td>
                                <td><a href={job.attachment} target="_blank" rel="noopener noreferrer">Link to JD</a></td>
                                <td> <button onClick={handleViewApplications} className="view-applications-btn">
                                    View Applications
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewJobs;




// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/ViewJobs.css'; // Ensure this path is correct

// const ViewJobs = () => {
//     const location = useLocation();
//     const { username } = location.state || { username: 'Guest' };

//     // Hardcoded job listings
//     const [jobs] = useState([
//         {
//             id: 1,
//             title: 'Frontend Developer',
//             description: 'Looking for a React developer with 3+ years of experience in frontend development.',
//             email: 'hr@company1.com',
//         },
//         {
//             id: 2,
//             title: 'Backend Developer',
//             description: 'Seeking a Node.js developer to build scalable backend services.',
//             email: 'hr@company2.com',
//         },
//         {
//             id: 3,
//             title: 'Full Stack Developer',
//             description: 'Full stack developer needed with expertise in both frontend and backend technologies.',
//             email: 'hr@company3.com',
//         },
//     ]);

//     return (
//         <div className="recruiter-container">
//             <h1 className="welcome-message">Welcome, {username}</h1>
//             <h2>Job Listings</h2>
//             {jobs.length === 0 ? (
//                 <p>No jobs available.</p>
//             ) : (
//                 <table className="jobs-table">
//                     <thead>
//                         <tr>
//                             <th>Job Title</th>
//                             <th>Description</th>
//                             <th>Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {jobs.map((job) => (
//                             <tr key={job.id}>
//                                 <td>{job.title}</td>
//                                 <td>{job.description}</td>
//                                 <td>{job.email}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default ViewJobs;
