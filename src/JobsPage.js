import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import JobList from './JobList';
import JoblyApi from './helpers/api';

/** All jobs page
 *
 * State:
 * - jobs: Object consisting of data, isLoading
 *    -data: Array of job objects
 *      { id, title, salary, equity, companyHandle, companyName }
 *    -isLoading: Boolean for whether the jobs data is loading
 *
 * RoutesList -> JobsPage -> { SearchForm, JobList }
 */

function JobsPage() {
  const [jobs, setJobs] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchJobsOnMount() {
    fetchJobs()
  }, []);

  async function fetchJobs(searchTerm) {
    const jobsData = await JoblyApi.getJobs(searchTerm);
    setJobs({
      data: [...jobsData],
      isLoading: false
    });
  }

  if (jobs.isLoading) return <i>Loading...</i>;

  return (
    <div className='JobsPage'>
      <SearchForm search={fetchJobs}/>
      <JobList jobs={jobs.data} />
    </div>
  );
}

export default JobsPage