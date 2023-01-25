import React from 'react';
import { Link } from 'react-router-dom';

/** Card displaying company information
 *
 * Props:
 * - company: Object with information on company
 *    { handle, name, description, numEmployees, logoUrl }
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ company }) {
  return (
    <div className='CompanyCard'>
      <Link to={`${company.handle}`}>
        <h2>{company.name}</h2>
        <p>{company.description}</p>
        <img src={company.logoUrl} alt={company.name}/>
      </Link>
    </div>
  );
}

export default CompanyCard;