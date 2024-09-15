document.addEventListener('DOMContentLoaded', function() {
    // Populate recruiter name
    const recruiterName = document.getElementById('recruiter-name');
    const username = localStorage.getItem('user_id');
    if (username) {
        recruiterName.textContent = username;
    } else {
        recruiterName.textContent = 'Recruiter';
    }

    const jobForm = document.getElementById('job-form');
    const jobsDiv = document.getElementById('jobs');
    const paginationNav = document.getElementById('pagination-nav');

    // Post a new job
    jobForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData();
        const description = document.getElementById('description').value;
        const pdf = document.getElementById('pdf').files[0];

        formData.append('description', description);
        formData.append('pdf_path', pdf);

        const response = await fetch('http://localhost:8000/portal/jobs/create/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Job posted successfully');
            loadJobs();  // Reload jobs after posting
        } else {
            alert('Error posting job');
        }
    });

    // Function to load the recruiter's jobs
    async function loadJobs(page=1) {
        const response = await fetch(`http://localhost:8000/portal/recruiter/jobs/?page=${page}`, {
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

    // Load the recruiter's jobs when the page loads
    loadJobs();
});
