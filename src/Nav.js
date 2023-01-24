import React from 'react';
import { NavLink } from 'react-router-dom';

/** Renders Nav Bar Component
 *
 * App -> Nav
 */
function Nav() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
    </div>
  )
}

export default Nav