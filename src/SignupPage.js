import React from 'react';
import UserForm from './UserForm';

/** User signup page
 *
 * Props:
 * - signup
 *
 * RoutesList -> SignupPage -> UserForm
 */

function SignupPage({ signup }) {
  const prompts = [
    {
      label: 'Username',
      name: 'username'
    },
    {
      label: 'Password',
      name: 'password'
    },
    {
      label: 'First Name',
      name: 'firstName'
    },
    {
      label: 'Last Name',
      name: 'lastName'
    },
    {
      label: 'Email',
      name: 'email'
    }
  ];

  return (
    <div>
      <h1>Sign Up</h1>
      <UserForm submit={signup} prompts={prompts} />
    </div>
  );
}

export default SignupPage;