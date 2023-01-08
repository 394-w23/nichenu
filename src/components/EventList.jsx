import Event from './Event.jsx'
import './EventList.css'

const EventList = ({ events }) => {
    return (
        <div>
            {
                events.map((event) => <Event key={event.id} event={event} />)
            }
        </div>
    );
}

export default EventList;