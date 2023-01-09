import './Message.css'
import { findUserDisplayName } from '../utils/helpers'

const Message = ({ message }) => {
    return (
        <div className="message"> 
            <div className="message-header">
                <div className="message-user">{ message.user }</div>
                <div className="message-timestamp">{ message.date }</div>
            </div>
            <div>{ message.content }</div>
            
        </div>
    )
}

export default Message;