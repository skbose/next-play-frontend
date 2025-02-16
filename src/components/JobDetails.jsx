import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetails.css'; // You'll need to create this CSS file
import config from '../config';

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `${config.API_URL}/portal/job/`;
    // TODO: Replace this with your actual API call
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const response = await fetch(`${apiUrl}${jobId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <div className="job-details-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-details-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="error">Job not found</div>
      </div>
    );
  }

  // Placeholder data until API is connected
  const mockJob = {
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    description: 'We are looking for a talented software engineer...',
    attachment_url: 'https://example.com/job-description.pdf'
  };

  const displayJob = job || mockJob;

  const handleApply = () => {
    navigate(`/student-portal/${displayJob.id}`);
  };

  return (
    <div className="job-details-container">
      <div className="job-header">
        <h1>{displayJob.title}</h1>
      </div>

      <div className="job-content">
        <section className="job-description">
          <h3>Brief</h3>
          <p>{displayJob.description}</p>
        </section>

        {displayJob.attachment_url && (
          <section className="job-attachment">
            <a href={displayJob.attachment_url} target="_blank" rel="noopener noreferrer">
              View Job Description
            </a>
          </section>
        )}
      </div>

      <div className="job-actions">
        <button className="apply-button" onClick={handleApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
