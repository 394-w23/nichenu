import { React, useState } from 'react'
import { ActionIcon, Input } from '@mantine/core';
import { RiSendPlane2Line } from "@react-icons/all-files/ri/RiSendPlane2Line";
import { useAuth, useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';
import "./MessageComposer"


const MessageComposer = ({ hobbyId, messages, setMessages }) => {
  const messageId = uuid();
  const [update, result] = useDbUpdate(`/hobbies/${hobbyId}/message_chat/messages/${messageId}`);
  // const [message, setMessage] = useState("");
  const user = useAuth();


  const submitMessage = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;

    const currDate = Date.now();

    const newMessage = {
      id: messageId,
      content: e.target[0].value,
      date: new Date(currDate).toISOString(),
      user: user.uid, ///////////////////////////////////////////// Change later 
    };
    update(newMessage);

    messages.push(newMessage);
    setMessages(messages);
    
    e.target.reset();
    // setMessage("")
  }

  return (
    <form data-cy="message-input" className="message-composer-container" onSubmit={submitMessage}
      style={{ margin: "10px auto", padding: "0", width: "90%"}}>
      <Input data-cy="message-input"
        placeholder='Write message' 
        rightSection={<ActionIcon data-cy="message-submit" type="submit"><RiSendPlane2Line /></ActionIcon>} 
      />
    </form>
  )
}


export default MessageComposer;