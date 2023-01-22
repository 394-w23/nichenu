import Event from './Event.jsx';
import { useState } from 'react';
import './EventList.css';
import { Title, Divider } from '@mantine/core'

const EventList = ({ eventList, user, setCurrDisplay }) => {
    const [events, setEvents] = useState(eventList);

    let hasEvents = user.event_ids;

    console.log(events)
 
    return (
        <div>
            <br></br>
            <Title order={2}>My Events</Title>
            {
                hasEvents 
                ? events.filter((event) => Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={true} setCurrDisplay={setCurrDisplay}/>)
                : <h4>Go add events!</h4> 
            }
            <br></br>

            <Title order={2}>Other Events</Title>
            {
                hasEvents
                ? events.filter((event) => !Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay}/>)
                : events.sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false}/>)
            }
        </div>
    );
}

export default EventList;