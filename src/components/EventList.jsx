import Event from './Event.jsx';
import { useState } from 'react';
import './EventList.css';
import { Title, Divider } from '@mantine/core'

const EventList = ({ eventList, user }) => {
    const [events, setEvents] = useState(eventList);

    return (
        <div>
            <br></br>
            {/* <Divider size="md" my="sm" color="#999" label="My Events" /> */}
            <Title order={2}>My Events</Title>
            {/* <Divider size="sm" color="#777" /> */}
            {
                events.filter((event) => Object.values(user.event_ids).includes(event.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user}/>)
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