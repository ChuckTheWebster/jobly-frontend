import React, { useContext } from 'react';
import userContext from './userContext';

function ProfilePage() {
  const { user } = useContext(userContext);


  console.log(user);
  return (

    <div>
      <h1>Profile Page</h1>
    </div>

  )
}

export default ProfilePage