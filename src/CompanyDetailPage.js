import React, { useEffect, useState } from "react";
import JobList from "./JobList";
import { useParams } from "react-router-dom";
import JoblyApi from "./helpers/api";
import './CompanyDetailPage.css'

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
    isLoading: true,
  });

  const { handle } = useParams();

  useEffect(function fetchCompanyOnMount() {
    async function fetchCompany() {
      let companyFromAPI;
      try {
        companyFromAPI = await JoblyApi.getCompany(handle);
      } catch (err) {
        console.error(err);
        companyFromAPI = null;
      }
      setCompany({
        data: companyFromAPI,
        isLoading: false
      })
    }

    fetchCompany();
  }, [handle]);

  if (company.isLoading) return <i>Loading...</i>;
  if (company.data === null) return <i>Company not found...</i>;

  return (
    <div className="CompanyDetailPage">

      <div className='companyInfoHeading mx-auto'>
        <h2>{company.data.name}</h2>
        <p>{company.data.description}</p>
      </div>

      <JobList jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetailPage;
