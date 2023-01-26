import './Message.css'
import { findUserDisplayName, findUserProfilePicture } from '../utils/helpers'
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line"
import moment from 'moment'
import { useAuth } from '../utils/firebase'


const Message = ({ message, users }) => {
    // console.log("this")
    const user = useAuth();
    // console.log(user.photoURL)

    return (
        <div className="message">

            {user && user.photoURL? <img className="message-avatar" src={findUserProfilePicture(message.user, users)}></img>:  <div className="message-avatar">
                <RiUser3Line size={20} />
            </div>
            
            }

            <div className="message-body">
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