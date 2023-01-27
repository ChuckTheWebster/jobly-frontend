import React, { useContext, useState } from 'react';
import MessageList from './MessageList';
import userContext from './userContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      errors = err.map(e => ({text: e, style: 'danger'}));
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      messages: errors ?
        errors :
        [{text: 'Updated successfully.', style: 'success'}]
    }))
  }

  return (

    <div>
      <h1>Profile Page</h1>

      <Container>
        <Row className='mb-5'>
          <Col md={5} className='mx-auto'>
            <Form className='UserEditForm' onSubmit={handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='usernameInput'>Username</Form.Label>
                <Form.Control
                  id='usernameInput'
                  name='username'
                  value={formData.username}
                  disabled
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='firstNameInput'>First Name</Form.Label>
                <Form.Control
                  id='firstNameInput'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='lastNameInput'>Last Name</Form.Label>
                <Form.Control
                  id='lastNameInput'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='emailInput'>Email</Form.Label>
                <Form.Control
                  id='emailInput'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="success" type="submit">Edit User</Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col xs={8} className='mx-auto'>
            <MessageList messages={formData.messages} />
          </Col>
        </Row>
      </Container>

    </div>

  );
}

export default ProfilePage;