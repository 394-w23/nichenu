import React from 'react'
import { ActionIcon, Input } from '@mantine/core';
import{RiSendPlane2Line} from "@react-icons/all-files/ri/RiSendPlane2Line"


export default function MessageComposer({message, addMessage, sendMessage}) {
   
  return (
    <div>
        <Input 
        placeholder='Write message'
        value={message}
        onChange={(e)=> addMessage(e.target.value)}
        style={{margin: 20}} rightSection={<ActionIcon onClick={sendMessage}>
            <RiSendPlane2Line/>
        </ActionIcon>}/>
        </div>
  )
}
