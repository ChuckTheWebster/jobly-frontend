import React, { useContext } from 'react';
import userContext from './userContext';
// import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function HomePage() {
  const { user } = useContext(userContext);

  return (
    <div>
      <h1>Jobly</h1>
      <h2>All the jobs in one, convenient place.</h2>

      { user.isLoggedIn &&
        <h2>Welcome Back, {user.data.firstName}</h2>
      }

      { !user.isLoggedIn &&
        <>
          <Button href='/login' variant='dark'>Login</Button>
          <Button href='/signup' variant='dark'>Sign Up</Button>
        </>
      }
    </div>
  )
}

export default HomePage