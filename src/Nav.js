import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

/** Renders Nav Bar Component
 *
 * App -> Nav
 */
function Nav() {
  return (
    <div className='Nav'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
    </div>
  )
}

export default Nav