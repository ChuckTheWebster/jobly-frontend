import React from 'react';
import UserForm from './UserForm';

function SignupPage({ signup }) {
  let prompts;

  return (
    <div>
      <h1>SignUp</h1>
      <UserForm submit={ signup } prompts={ prompts }/>
    </div>
  )
}

export default SignupPage