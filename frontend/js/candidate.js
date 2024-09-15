document.addEventListener('DOMContentLoaded', function() {
    // Populate candidate name
    const candidateName = document.getElementById('candidate-name');
    const username = localStorage.getItem('user_id');
    console.log(username);
    if (username) {
        candidateName.textContent = username;
    } else {
        candidateName.textContent = 'Candidate';
    }

    const jobsDiv = document.getElementById('jobs');
    const paginationNav = document.getElementById('pagination-nav');

    // Load available jobs
    async function loadJobs(page=1) {
        const response = await fetch(`http://localhost:8000/portal/jobs/?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        const data = await response.json();
        jobsDiv.innerHTML = '';

        data.results.forEach(job => {
            jobsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${job.description}</h5>
                            <a href="${job.pdf_path}" class="btn btn-primary" download>Download PDF</a>
                            <button class="btn btn-success mt-2" onclick="applyForJob('${job.job_id}')">Apply</button>
                        </div>
                    </div>
                </div>
            `;
        });

        setupPagination(data);
    }

    function setupPagination(data) {
        const pagination = paginationNav.querySelector('ul');
        pagination.innerHTML = '';

        for (let i = 1; i <= data.total_pages; i++) {
            pagination.innerHTML += `
                <li class="page-item ${i === data.page ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="loadJobs(${i})">${i}</a>
                </li>
            `;
        }
    }

    // Apply for a job
    async function applyForJob(job_id) {
        const formData = new FormData();
        formData.append('resume_path', document.getElementById('resume').files[0]);
        formData.append('experience_summary', '5 years experience');  // Example experience

        const response = await fetch(`http://localhost:8000/portal/jobs/${job_id}/apply/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        if (response.ok) {
            alert('Applied successfully');
        } else {
            alert('Error applying for the job');
        }
    }

    // Load available jobs when the page loads
    loadJobs();
});
