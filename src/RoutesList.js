import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CompaniesPage from './CompaniesPage';
import JobsPage from './JobsPage';
import CompanyDetailPage from './CompanyDetailPage';


function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={ HomePage }/>
      <Route path="/companies" element={ CompaniesPage }/>
      <Route path="/jobs" element={ JobsPage }/>
      <Route path="/companies/:handle" element={ CompanyDetailPage }/>
      <Route path="*"/>
    </Routes>
  )
}

export default RoutesList