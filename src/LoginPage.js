import React from 'react';
import UserForm from './UserForm';
import "./LoginPage.css";

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
      <div className="LoginPage mx-auto mt-4 mb-2">
        <h1>Login</h1>
        <hr/>
        <UserForm submit={login} prompts={prompts} />
      </div>
    </div>
  );
}

export default LoginPage;