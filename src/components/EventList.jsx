import Event from './Event.jsx';
import { useState } from 'react';
import './EventList.css';
import { Title, Divider } from '@mantine/core'

const EventList = ({ eventList, user }) => {
    const [events, setEvents] = useState(eventList);


    console.log(events)
 
    return (
        <div>
            <br></br>
            {/* <Divider size="md" my="sm" color="#999" label="My Events" /> */}
            <Title order={2}>My Events</Title>
            {/* <Divider size="sm" color="#777" /> */}
            {
             user.event_ids && events.filter((event) => Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user}/>)
            }
            <br></br>

            <Title order={2}>Other Events</Title>
            {
                events.sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user}/>)
            }
        </div>
    );
}

export default EventList;