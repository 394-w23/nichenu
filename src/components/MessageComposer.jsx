import { React, useState } from 'react'
import { ActionIcon, Input } from '@mantine/core';
import { RiSendPlane2Line } from "@react-icons/all-files/ri/RiSendPlane2Line";
import { useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';
import "./MessageComposer"


const MessageComposer = ({ hobbyId, messages, setMessages }) => {
  const messageId = uuid();
  const [update, result] = useDbUpdate(`/hobbies/${hobbyId}/message_chat/messages/${messageId}`);
  // const [message, setMessage] = useState("");

  const submitMessage = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;

    const currDate = Date.now();

    const newMessage = {
      id: messageId,
      content: e.target[0].value,
      date: new Date(currDate).toISOString(),
      user: 1001, ///////////////////////////////////////////// Change later 
    };
    update(newMessage);
    messages.push(newMessage);
    setMessages(messages);
    e.target.reset();
    // setMessage("")
  }

  return (
    <form className="message-composer-container" onSubmit={submitMessage}
      style={{ margin: "10px auto", padding: "0", width: "90%"}}>
      <Input
        placeholder='Write message' 
        rightSection={<ActionIcon type="submit"><RiSendPlane2Line /></ActionIcon>} 
      />
    </form>
  )
}


export default MessageComposer;