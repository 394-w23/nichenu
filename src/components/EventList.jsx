import Event from './Event.jsx';
import { useState } from 'react';
import './EventList.css';

const EventList = ({ eventList }) => {
    const [events, setEvents] = useState(eventList);

    return (
        <div>
            {
                events.sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} />)
            }
        </div>
    );
}

export default EventList;