import './ChatRoom.css'
import Message from './Message';
import styled from 'styled-components';
import MessageComposer from './MessageComposer';
import { ActionIcon } from '@mantine/core';
import { RiUserAddLine } from "@react-icons/all-files/ri/RiUserAddLine"
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line"
import { useState } from 'react';
import uuid from 'react-uuid';


const ChatRoom = ({ messageLog, users }) => {

    console.log(Object.values(messageLog.messages))
    const sortedMessages = Object.values(messageLog.messages) ?
        Object.values(messageLog.messages).sort((message1, message2) => (new Date(message1.date)).getTime() - (new Date(message2.date)).getTime())
        : []

    const [sortedMessagesLocal, setSortedMessagesLocal] = useState(sortedMessages);
    const [localMessage, setLocalMessage] = useState('');

    // local message
    const addMessage = (message) => {
        setLocalMessage(message)
        console.log(message)
    }

    const sendMessage = (e) => {
        let messageObject = { date: new Date(), id: 25, user: 1001, content: localMessage }
        setSortedMessagesLocal(sortedMessages=> [...sortedMessages, messageObject])
        document.querySelector('#auto-scroll').scrollIntoView({behavior: "smooth"});// trigger scoll to the bottom
        setLocalMessage("") // clear message field
    }


    return (
        <StyledMainArea>

            <StyledSubHeader>
                {hobby.name}
                <StyledSubHeaderAvatars>
                    <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar>
                    <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar>
                    <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar>
                    <ActionIcon style={{ marginLeft: 10 }} on>
                        <RiUserAddLine size={32} />
                    </ActionIcon>
                </StyledSubHeaderAvatars>
            </StyledSubHeader>

            <StyledMessageArea>
                {sortedMessages.map((message) => <Message key={message.id} message={message} users={users} />)}
              <div style={{height: 100}} id="auto-scroll"></div>
            </StyledMessageArea>

            <MessageComposer message={localMessage} addMessage={addMessage} sendMessage={sendMessage} />
          
        </StyledMainArea>


    )
}


// Styled Components
const StyledMainArea = styled.div`
height: 90vh;
display: grid;
grid-template-rows: 1fr 10fr 2fr;
overflow: hidden;
`;

const StyledMessageArea = styled.div`
overflow-y: scroll;
height: 100%
`;

const StyledSubHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 20px;
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