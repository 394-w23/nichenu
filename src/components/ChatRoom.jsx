import './ChatRoom.css'
import { useState } from 'react'
import Message from './Message';
import styled from 'styled-components';
import MessageComposer from './MessageComposer';
import { ActionIcon } from '@mantine/core';
import { RiUserAddLine } from "@react-icons/all-files/ri/RiUserAddLine"
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line"


const ChatRoom = ({ hobby, users }) => {
    // console.log(hobby)

    const sortedMessages = Object.values(hobby.message_chat.messages) 
        ? Object.values(hobby.message_chat.messages).sort((message1, message2) => (new Date(message1.date)).getTime() - (new Date(message2.date)).getTime())
        : []

    const [messages, setMessages] = useState(sortedMessages);

    return (
        <StyledMainArea>

            <StyledSubHeader>
                {hobby.name}
                <StyledSubHeaderAvatars>
                 
                <StyledMiniAvatar>
                        <RiUser3Line size={16}/>
                    </StyledMiniAvatar>
                    <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar>
                    <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar>

                    <ActionIcon style={{marginLeft: 10}}>
                        <RiUserAddLine size={32} />
                    </ActionIcon>
                </StyledSubHeaderAvatars>

            </StyledSubHeader>

            <StyledMessageArea>
                {messages.map((message) => <Message key={message.id} message={message} users={users} />)}
                
            </StyledMessageArea>

            <MessageComposer hobbyId={hobby.id} messages={messages} setMessages={setMessages}/>
        </StyledMainArea>


    )
}


// Styled Components
const StyledMainArea = styled.div`
height: 85vh;
display: grid;
grid-template-rows: 1fr 10fr 2fr;
overflow: hidden;
`

const StyledMessageArea = styled.div`
overflow-y: scroll;
height: 100%
`;

const StyledSubHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 20px;
`

const StyledSubHeaderAvatars = styled.div`
display: flex
`

const StyledMiniAvatar = styled.div`
height: 30px;
width: 30px;
border-radius: 10px;
display: flex;
justify-content:center;
align-items: center;
background-color: #ccc;
border: solid #fff 2px;
margin-right: -5px
`

export default ChatRoom;