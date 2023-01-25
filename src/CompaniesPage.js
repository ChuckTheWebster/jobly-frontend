import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import CompanyList from './CompanyList';
import JoblyApi from './helpers/api';

/** All companies page
 *
 * State:
 * - companies: Object consisting of data, isLoading
 *    -data: Array of company objects
 *      { handle, name, description, numEmployees, logoUrl}
 *    -isLoading: Boolean for whether the companies data is loading
 *
 * RoutesList -> CompaniesPage -> { SearchForm, CompanyList }
 */

function CompaniesPage() {
  const [companies, setCompanies] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchCompaniesOnMount() {
    fetchCompanies()
  }, [])

  async function fetchCompanies(searchTerm) {
    const companiesData = await JoblyApi.getCompanies(searchTerm);
    setCompanies({
      data: [...companiesData],
      isLoading: false
    });
  }

  if (companies.isLoading) return <i>Loading...</i>;

  return (
    <div className='CompaniesPage'>
      <SearchForm search={fetchCompanies}/>
      <CompanyList companies={companies.data} />
    </div>
  );
}

export default CompaniesPage;