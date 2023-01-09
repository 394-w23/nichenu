import './Event.css'
import Message from './Message'


const ChatRoom = ({ messageLog }) => {
    const sortedMessages = messageLog.messages.sort((message1,message2) => (new Date(message1.date)).getTime() - (new Date(message2.date)).getTime());
    return (
        <div> 
            
            {sortedMessages.messages.map((message) => <Message message = {message}/>)}
            
        
        </div>


    )
}

export default ChatRoom;