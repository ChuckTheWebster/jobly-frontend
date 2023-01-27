import React from "react";
import Card from "react-bootstrap/Card";
import './JobCard.css';

/** Card with job information
 *
 * Props:
 * -job: Object with job information
 *    { id, title, salary, equity, companyName }
 *
 * JobList -> JobCard
 */

function JobCard({ job }) {
  return (
    <Card className="JobCard mx-auto my-3">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Text>
          {job.companyName}
        </Card.Text>
        <Card.Text>
          <small>Salary: {job.salary}</small>
        </Card.Text>
        <Card.Text>
          <small>Equity: {job.equity}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default JobCard;
