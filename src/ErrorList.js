import React from 'react'

/** List of error messages.
 *
 * Props:
 * - errors: array of string error messages
 *
 * UserForm -> ErrorList
 */

function ErrorList({ errors }) {
  return (
    <div className="ErrorList">
      { errors.map(e => (
        <p key={`Error: ${e}`}>
          {e}
        </p>
      ))}
    </div>
  )
}

export default ErrorList