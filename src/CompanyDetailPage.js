import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import { useParams, useNavigate } from 'react-router-dom';
import JoblyApi from './helpers/api';

/** Detail page for a company
 *
 * States:
 * -company: Object with data, isLoading
 *    -data: Object with information on company
 *      { handle, name, description, numEmployees, logoUrl, jobs }
 *      where jobs is [{ id, title, salary, equity }, ...]
 *    -isLoading: Boolean for whether company data is loading
 *
 * RoutesList -> CompanyDetailPage -> JobList
 */

function CompanyDetailPage() {
  const [company, setCompany] = useState({
    data: null,
    isLoading: true
  });

  const navigate = useNavigate();
  const { handle } = useParams();

  useEffect(function fetchCompanyOnMount() {
    async function fetchCompany() {
      const companyData = await JoblyApi.getCompany(handle);
      if (companyData) {
        setCompany({
          data: companyData,
          isLoading: false
        });
      } else {
        setCompany({
          data: null,
          isLoading: false
        })
        navigate('/');
      }
    }

    fetchCompany();
  }, []);

  if (company.isLoading) return <i>Loading...</i>;

  return (
    <div className='CompanyDetailPage'>
      <h2>{company.data.name}</h2>
      <p>{company.data.description}</p>
      <JobList jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetailPage;