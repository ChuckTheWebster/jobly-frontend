import React from 'react';
import UserForm from './UserForm';

/** User login page
 *
 * Props:
 * - login
 *
 * RoutesList -> LoginPage -> UserForm
 */

function LoginPage({ login }) {

  const prompts = [
    {
      label: "Username",
      name: "username"
    },
    {
      label: 'Password',
      name: 'password'
    }
  ];

  return (
    <div>
      <h1>Login</h1>
      <UserForm submit={login} prompts={prompts} />
    </div>
  );
}

export default LoginPage;