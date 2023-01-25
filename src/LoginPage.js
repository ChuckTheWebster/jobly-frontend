import React from 'react'
import UserForm from './UserForm';

function LoginPage({ login }) {

  let prompts;

  return (
    <div>
      <h1>Login</h1>
      <UserForm submit={ login } prompts={ prompts }/>
    </div>
  )
}

export default LoginPage