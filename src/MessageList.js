import React from 'react';
import Alert from 'react-bootstrap/Alert';

/** List of messages.
 *
 * Props:
 * - messages: array of string messages
 *
 * { UserForm, ProfilePage } -> MessageList
 */

function MessageList({ messages }) {
  return (
    <div className="MessageList">
      { messages.map(m => (
        <Alert variant="info" key={`Message: ${m}`}>
          {m}
        </Alert>
      ))}
    </div>
  )
}

export default MessageList