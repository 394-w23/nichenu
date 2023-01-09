import './Message.css'
import { findUserDisplayName } from '../utils/helpers'

const Message = ({ message }) => {
    return (
        <div>
            <div className='message-date'>{message.date}</div>
            <div className='message-content'>{message.content}</div>
            <div className='message-user'>{findUserDisplayName(message.user)}</div>
        </div>


    )
}

export default Message;