import React, { useContext, useState } from 'react';
import ErrorList from './ErrorList';
import userContext from './userContext';

/** User profile page with edit form
 *
 * State:
 * -formData: Object with user edit form values
 *
 * RoutesList -> ProfilePage
 */

function ProfilePage() {
  const { user, saveUserEdit } = useContext(userContext);
  const { username, firstName, lastName, email } = user.data;

  const [formData, setFormData] = useState({
    messages: [],
    username,
    firstName,
    lastName,
    email
  });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    let errors;

    try {
      await saveUserEdit(formData);
    } catch (err) {
      errors = err;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      messages: errors ? errors : ['Updated successfully.']
    }))
  }

  return (

    <div>
      <h1>Profile Page</h1>

      <form className='UserEditForm' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='usernameInput'>Username</label>
          <input
            id='usernameInput'
            name='username'
            value={formData.username}
            disabled
          />
        </div>

        <div>
          <label htmlFor='firstNameInput'>First Name</label>
          <input
            id='firstNameInput'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor='lastNameInput'>Last Name</label>
          <input
            id='lastNameInput'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor='emailInput'>Email</label>
          <input
            id='emailInput'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button>Edit User</button>
      </form>
      <ErrorList errors={formData.messages} />
    </div>

  );
}

export default ProfilePage;