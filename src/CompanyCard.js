import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./CompanyCard.css";

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

    <Link to={`${company.handle}`} style={{textDecoration: 'none', color: 'black'}}>
      <Card className="CompanyCard mx-auto my-3">
          <Card.Body className="CardBody">
            {company.logoUrl && <Card.Img className="mb-4" variant="top" src={company.logoUrl} alt={company.name}/>}
            <Card.Title >{company.name}</Card.Title>
            <hr/>
            <Card.Text>{company.description}</Card.Text>
          </Card.Body>
      </Card>
    </Link>
  );
}

export default CompanyCard;
