import './Event.css'
import {findUserDisplayName} from '../App'

const Message = ({ message }) => {
    return (
        <div> 
            <div>{message.content}</div>
            <div>{message.date}</div>
            <div>{findUserDisplayName(message.user)}</div>
        </div>


    )
}

export default Event;