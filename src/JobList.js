import React from 'react';
import JobCard from './JobCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** List of job cards
 *
 * Props:
 * - jobs: Array of job objects
 *    { id, title, salary, equity, companyHandle, companyName }
 *
 * JobsPage -> JobList -> JobCard
 */

function JobList({ jobs }) {
  return (
    <div className='JobList'>
      <Container>
        <Row>
            {jobs.map(job =>
              <Col xs={10} md={6} xl={4} key={job.id} className='mx-auto'>
                <JobCard
                  job={job}
                />
              </Col>
            )}
        </Row>
      </Container>
    </div>
  );
}

export default JobList;