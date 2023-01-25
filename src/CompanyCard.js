import React from 'react'

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
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
    </div>
  )
}

export default CompanyCard