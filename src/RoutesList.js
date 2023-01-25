import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import CompaniesPage from './CompaniesPage';
import JobsPage from './JobsPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProfilePage from './ProfilePage';
import CompanyDetailPage from './CompanyDetailPage';

/** App Routes
 *
 * App -> RoutesList
 */
function RoutesList({ signup, login }) {
  return (
    <Routes>
      <Route path="/" element={ <HomePage/> }/>
      <Route path="/login" element={ <LoginPage login={ login }/> }/>
      <Route path="/signup" element={ <SignupPage signup={ signup }/> }/>
      <Route path="/profile" element={ <ProfilePage/> }/>
      <Route path="/companies" element={ <CompaniesPage/> }/>
      <Route path="/jobs" element={ <JobsPage/> }/>
      <Route path="/companies/:handle" element={ <CompanyDetailPage/> }/>
      <Route path="*" element={ <Navigate to='/'/> }/>
    </Routes>
  )
}

export default RoutesList