import React from 'react'
import { ActionIcon, Input } from '@mantine/core';
import{RiSendPlane2Line} from "@react-icons/all-files/ri/RiSendPlane2Line"


export default function MessageComposer() {
  return (
    <div>
        <Input 
        placeholder='Write message'
        
        style={{margin: 20}} rightSection={<ActionIcon>
            <RiSendPlane2Line/>
        </ActionIcon>}/>
        </div>
  )
}
