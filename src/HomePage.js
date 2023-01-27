import React, { useContext } from 'react';
import userContext from './userContext';
// import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './HomePage.css';

function HomePage() {
  const { user } = useContext(userContext);

  return (
    <div className='HomePage'>
      {user.isLoggedIn &&
        <div className='welcomeMessage'>
          <h2>Welcome Back, {user.data.firstName}</h2>
        </div>
      }
      <div className='joblyHomeBanner'>
        <h1>Jobly</h1>
        <h2>All the jobs in one, convenient place.</h2>
        {!user.isLoggedIn &&
          <>
            <Button className='homePageButton' href='/login' variant='dark'>Login</Button>
            <Button className='homePageButton' href='/signup' variant='dark'>Sign Up</Button>
          </>
        }
      </div>
    </div>
  );
}

export default HomePage;