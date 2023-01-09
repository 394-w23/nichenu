import './Message.css'
import { findUserDisplayName } from '../utils/helpers'

const Message = ({ message, users }) => {
    return (
        <div className="message"> 
            <div className="message-header">
                <div className="message-user">{ findUserDisplayName(message.user, users) }</div>
                <div className="message-timestamp">{ new Date(message.date).toString() }</div>
            </div>
            <div>{ message.content }</div>
            
        </div>
    )
}

export default Message;