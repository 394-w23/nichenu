import './ChatRoom.css'
import { useEffect, useRef, useState } from 'react'
import Message from './Message';
import styled from 'styled-components';
import MessageComposer from './MessageComposer';
import { ActionIcon, Button } from '@mantine/core';
import { RiAddFill } from "@react-icons/all-files/ri/RiAddFill"
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line"
import { useDbData, useDbUpdate } from '../utils/firebase';


const ChatRoom = ({ hobby, users, user, setCurrDisplay }) => {
    const [update, result] = useDbData(`/hobbies/${hobby.id}/message_chat`)
    const [updateHobbyList, resultHobbyList] = useDbUpdate(`/hobbies/`); 
    const [updateHobby, resultHobby] = useDbUpdate(`/hobbies/${hobby.id}/message_chat/users/`);
    const [updateUser, resultUser] = useDbUpdate(`/users/${user.id}/hobby_ids/`);

    let sortedMessages = update && Object.values(update.messages)
        ? Object.values(update.messages).sort((message1, message2) => (new Date(message1.date)).getTime() - (new Date(message2.date)).getTime())
        : Object.values(hobby.message_chat.messages).sort((message1, message2) => (new Date(message1.date)).getTime() - (new Date(message2.date)).getTime())

    const [messages, setMessages] = useState(sortedMessages);
    const messagesRef = useRef({});

    const scrollToBottom = () => {
        // messagesRef.current?.scrollIntoView({ behavior: "auto" });
    };
    useEffect(() => {
        if (update) {
            setMessages(Object.values(update.messages).sort((message1, message2) => (new Date(message1.date)).getTime() - (new Date(message2.date)).getTime()))
        }
        scrollToBottom();
    }, [update]);

    // Handle leaving a hobby
    const LeaveHobby = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // if (!e.target.value) return;
        
        if (Object.values(hobby.message_chat.users).length == 1) {
            updateHobbyList({
                [hobby.id]: null,
            });

            updateUser({
                [hobby.id]: null,
            });

        } else {
            updateHobby({
                [user.id]: null,
            });
    
            updateUser({
                [hobby.id]: null,
            });

            delete hobby.message_chat.users[user.id]
        }

        setCurrDisplay("hobbies");
    }

    return (
        <StyledMainArea>

            <StyledSubHeader>
                <span className="chatroom-name">{hobby.name}</span>
                <StyledSubHeaderAvatars>
                <Button onClick={LeaveHobby} style={{marginLeft: 5}} size="xs" color="red">Leave</Button>
                    {/* <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar>
                    <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar>
                    <StyledMiniAvatar>
                        <RiUser3Line size={16} />
                    </StyledMiniAvatar> */}
        
                </StyledSubHeaderAvatars>
            </StyledSubHeader>

            <StyledMessageArea>
                {messages.map((message) => <Message key={message.id} message={message} users={users} />)}
                <div ref={messagesRef}></div>
            </StyledMessageArea>

            <MessageComposer hobbyId={hobby.id} messages={messages} setMessages={setMessages} />
        </StyledMainArea>


    )
}


// Styled Components
const StyledMainArea = styled.div`
height: 90%;
display: grid;
grid-template-rows: 1fr 10fr 80px;
overflow: hidden;
position: fixed;
top: 10%;
left: 0;
right: 0;
`

const StyledMessageArea = styled.div`
overflow-y: scroll;
position: relative;
bottom: 0;
`

const StyledSubHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 20px;
position: sticky;
top: 0;
border-bottom: 1px solid #ccc;
`

const StyledSubHeaderAvatars = styled.div`
display: flex;
padding-left: 1.4vw;
border-left: 1px solid #ccc;
align-items: center;
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