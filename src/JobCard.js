import React from "react";
import Card from "react-bootstrap/Card";

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
    <Card className="JobCard mx-auto my-3" style={{ width: "25rem" }}>
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

    // <div className='JobCard'>
    //   <h3>{job.title}</h3>
    //   <p>{job.companyName}</p>
    //   <p><small>Salary: {job.salary}</small></p>
    //   <p><small>Equity: {job.equity}</small></p>
    // </div>
  );
}

export default JobCard;
