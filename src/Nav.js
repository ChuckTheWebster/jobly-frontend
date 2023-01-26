import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

import userContext from './userContext';

/** Renders Nav Bar Component
 *
 * Props:
 * - logout: Function to log user out
 *
 * App -> Nav
 */
function Nav({ logout }) {
  const { user } = useContext(userContext);

  return (
    <div className='Nav'>
      <NavLink to="/">Home</NavLink>

      { !user.isLoggedIn &&
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      }

      { user.isLoggedIn &&
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={logout}>{`Logout ${user.data.username}`}</button>
        </>
      }

    </div>
  );
}

export default Nav;