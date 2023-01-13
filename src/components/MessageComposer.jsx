import React from 'react'
import { ActionIcon, Input } from '@mantine/core';
import {RiSendPlane2Line} from "@react-icons/all-files/ri/RiSendPlane2Line"
import "./MessageComposer"


export default function MessageComposer() {
  return (
    <div className="message-composer-container">
        <Input 
        placeholder='Write message'
        
        style={{margin: "0px 20px"}} rightSection={<ActionIcon>
            <RiSendPlane2Line/>
        </ActionIcon>}/>
    </div>
  )
}
