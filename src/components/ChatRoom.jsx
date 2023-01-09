import './ChatRoom.css'
import Message from './Message';

const ChatRoom = ({ messageLog }) => {
    return (
        <div>  
            {
                Object.values(messageLog.messages).map((message) => <Message key={message.id} message={message}/>)
            }
        </div>
    )
}

export default ChatRoom;