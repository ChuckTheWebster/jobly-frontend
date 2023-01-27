import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import userContext from "./userContext";

/** Renders JoblyNav Bar Component
 *
 * Props:
 * - logout: Function to log user out
 *
 * App -> JoblyNav
 */
function JoblyNav({ logout }) {
  const { user } = useContext(userContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Jobly</Navbar.Brand>
        <Nav className="ms-auto">
          {!user.isLoggedIn && (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          )}

          {user.isLoggedIn && (
            <>
              <Nav.Link href="/companies">Companies</Nav.Link>
              <Nav.Link href="/jobs">Jobs</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Button
                onClick={logout}
                variant="light"
              >{`Logout: ${user.data.username} (${user.data.firstName})`}</Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default JoblyNav;
