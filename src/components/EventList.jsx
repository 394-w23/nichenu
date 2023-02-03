import Event from './Event.jsx';
import { useState } from 'react';
import './EventList.css';
import { Title, Divider, TextInput } from '@mantine/core'
import { HiSearch } from "@react-icons/all-files/hi/HiSearch";

const EventList = ({ hobbyList, eventList, user, setCurrDisplay }) => {
    const [events, setEvents] = useState(eventList.filter(event => Date.now() <= new Date(event.end_timestamp)));
    const [hobbies, setHobbies] = useState(hobbyList);
    const [hasEvents, setHasEvents] = useState(user.event_ids !== null);
    // console.log(hobbies.filter((hb) => hb.id === "2a042630-4fc9-4d7b-ffed-d2e2ac6fe246"))
    // let hasEvents = user.event_ids; 
    const [query, setquery] = useState('')
    const handleChange = (e) => {
        setquery(e.target.value)
        setEvents(eventList.filter(event => event.name.toLowerCase().includes((e.target.value).toLowerCase())))
    }


    return (
        <div data-cy="event-list">
            <form>
                <TextInput type="search" placeholder="Search" icon={<HiSearch></HiSearch>} value={query} onChange={handleChange} />
            </form>
            <Title order={2}>My Events</Title>
            {
                hasEvents
                    ? events.filter((event) => Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={true} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} setHasEvents={setHasEvents} hobbies={hobbies} />)
                    : <div className="empty-event-text">Go add events!</div>
            }
            <br></br>

            <Title order={2}>Other Events</Title>
            {
                hasEvents
                    ? events.filter((event) => !Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} setHasEvents={setHasEvents} hobbies={hobbies} />)
                    : events.sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} setHasEvents={setHasEvents} />)
            }
        </div>
    );
}

export default EventList;