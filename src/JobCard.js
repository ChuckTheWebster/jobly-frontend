import React from 'react'

/** Card with job information
 *
 * Props:
 * -job: Object with job information
 *    { id, title, salary, equity, companyHandle, companyName }
 *
 * JobList -> JobCard
 */

function JobCard({ job }) {
  return (
    <div className='JobCard'>
      <h3>{job.title}</h3>
      <p>{job.companyName}</p>
      <p><small>Salary: {job.salary}</small></p>
      <p><small>Equity: {job.equity}</small></p>
    </div>
  )
}

export default JobCard