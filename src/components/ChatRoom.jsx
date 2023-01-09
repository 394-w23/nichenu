import './ChatRoom.css'
import Message from './Message';

const ChatRoom = ({ messageLog }) => {
    console.log(Object.values(messageLog.messages))
    const sortedMessages = Object.values(messageLog.messages) ? 
        Object.values(messageLog.messages).sort((message1,message2) => (new Date(message1.date)).getTime() - (new Date(message2.date)).getTime())
        : []
    return (
        <div> 
            {sortedMessages.map( (message) => <Message message = {message}/>)}
        </div>
    )
}

export default ChatRoom;