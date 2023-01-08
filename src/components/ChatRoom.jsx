import './Event.css'



const ChatRoom = ({ messageLog }) => {
    return (
        <div> 
            
            {messageLog.messages.map((message) => <Message message = {message}/>)}
            
        

         
        </div>


    )
}

export default Event;