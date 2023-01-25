import React from 'react';
import JobCard from './JobCard';

/** List of job cards
 *
 * Props:
 * - jobs: Array of job objects
 *    { id, title, salary, equity, companyHandle, companyName }
 *
 * JobsPage -> JobList -> JobCard
 */

function JobList({ jobs }) {
  return (
    <div className='JobList'>
      {jobs.map(job =>
        <JobCard
          key={job.id}
          job={job}
        />
      )}
    </div>
  );
}

export default JobList;