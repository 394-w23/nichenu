import './Event.css'


const Message = ({ message }) => {
    return (
        <div> 
            
            {message.messages.map((message) => <Message message = {message}/>)}
            
         
        </div>


    )
}

export default Event;