import React from 'react';
import CompanyCard from './CompanyCard';

/** List of company cards
 *
 * Props:
 * - companies: Array of company objects
 *    { handle, name, description, numEmployees, logoUrl}
 *
 * CompaniesPage -> CompanyList -> CompanyCard
 */

function CompanyList({ companies }) {
  return (
    <div className='CompanyList'>
      {companies.map(company =>
        <CompanyCard
          key={company.handle}
          company={company}
        />
      )}
    </div>
  );
}

export default CompanyList;