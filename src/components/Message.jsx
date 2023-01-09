import './Message.css'
import { findUserDisplayName } from '../utils/helpers'
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line"
import moment from 'moment'


const Message = ({ message, users }) => {
    console.log("this")
    return (
        <div className="message">

            <div className="message-avatar">
                <RiUser3Line size={20} />
            </div>

            <div>
                <div className="message-header">
                    <div className="message-user">{findUserDisplayName(message.user, users)}</div>
                    <div className="message-timestamp">{moment(message.date).fromNow()}</div>
                </div>
                <div>{message.content}</div>
            </div>
        </div>
    )
}

export default Message;