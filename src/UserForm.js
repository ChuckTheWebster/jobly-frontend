import React, { useState } from "react";

/** Form with customizable prompts and submit.
 *
 * State:
 * - formData: object of form input name: value pairs
 *    -errors: Array of string error messages to display
 *
 * Props:
 * - prompts: an array of objects as prompts for inputs
 *            { label, name }
 * - submit:  function called upon submit
 *
 * { LoginPage, SignupPage } -> UserForm
 */

function UserForm({ prompts, submit }) {
  let initialFormState = { errors: [] };

  for (let prompt of prompts) {
    initialFormState[prompt.name] = '';
  }

  const [formData, setFormData] = useState(initialFormState);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    const errors = generateInputErrors(); // [errors, ...] []

    // Check for input errors (i.e. empty input)
    if (errors.length > 0) {
      setFormData(prevFormData => ({
        ...prevFormData,
        errors: errors
      }));
    } else {
      submit(formData); // TODO: Do the try catch here first.
      setFormData(initialFormState);
    }
  }

  /** Check for empty inputs and generate a list of error messages */
  function generateInputErrors() {
    const errors = prompts
      .filter(prompt => formData[prompt.name] === '')
      .map(prompt => `${prompt.label} is a required input.`);
    return errors;
  }

  return (
    <>
      <form className="Prompts" onSubmit={handleSubmit}>
        {prompts.map((p, i) => (
          <div key={i}>
            <label htmlFor={p.name}>{p.label}</label>
            <input
              id={p.name}
              name={p.name}
              onChange={handleChange}
              value={formData[p.name]}
              type={p.name === 'password' ? 'password' : 'text'}
            />
          </div>
        ))}
        <button>Submit</button>
      </form>
      <div>
        {formData.errors.map(e => (
          <p key={`Error: ${e}`}>
            {e}
          </p>
        ))}
      </div>
    </>
  );
}

export default UserForm;
