import React, { useState } from "react";

/** Form with customizable prompts and submit.
 *
 * State:
 * - formData: object of form input name: value pairs
 *
 * Props:
 * - prompts: an array of objects as prompts for inputs
 *            { label, name }
 * - submit:  function called upon submit
 *
 * { LoginPage, SignupPage } -> UserForm
 */

function UserForm({ prompts, submit }) {
  const [formData, setFormData] = useState({});

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
    submit(formData);
    setFormData({});
  }

  return (
    <form className="Prompts" onSubmit={handleSubmit}>
      {prompts.map((p, i) => (
        <div key={i}>
          <label htmlFor={p.name}>{p.label}</label>
          <input
            id={p.name}
            name={p.name}
            onChange={handleChange}
            value={formData[p.name]}
          />
        </div>
      ))}
    </form>
  );
}

export default UserForm;
