import Event from './Event.jsx';
import { useState } from 'react';
import './EventList.css';
import { Title, Divider } from '@mantine/core'

const EventList = ({ eventList, user, setCurrDisplay }) => {
    const [events, setEvents] = useState(eventList);
    const [hasEvents, setHasEvents] = useState(user.event_ids !== null);

    // let hasEvents = user.event_ids;

    console.log(events)
 
    return (
        <div>
            <br></br>
            <Title order={2}>My Events</Title>
            {
                hasEvents 
                ? events.filter((event) => Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={true} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} setHasEvents={setHasEvents}/>)
                : <div className="empty-event-text">Go add events!</div> 
            }
            <br></br>

            <Title order={2}>Other Events</Title>
            {
                hasEvents
                ? events.filter((event) => !Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} setHasEvents={setHasEvents}/>)
                : events.sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} setHasEvents={setHasEvents}/>)
            }
        </div>
    );
}

export default EventList;