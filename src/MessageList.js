import React from 'react'

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
      { messages.map(e => (
        <p key={`Message: ${e}`}>
          {e}
        </p>
      ))}
    </div>
  )
}

export default MessageList