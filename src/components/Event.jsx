import './Event.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine";
import { RiIndeterminateCircleLine } from "@react-icons/all-files/ri/RiIndeterminateCircleLine";
import { ActionIcon } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';

const Event = ({ event, user, added, setCurrDisplay, setEvents, events }) => {
    const [updateEventList, resultEventList] = useDbUpdate(`/events/`); 
    const [updateEvent, resultEvent] = useDbUpdate(`/events/${event.id}/users/`);
    const [updateUser, resultUser] = useDbUpdate(`/users/${user.id}/event_ids/`);
    let participants = Object.values(event.users).length

    const months = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const start = new Date(event.start_timestamp);
    const end = new Date(event.end_timestamp);

    const JoinEvent = (e) => {
        e.preventDefault();
        // if (!e.target.value) return;

        updateEvent({
            [user.id]: user.id,
        });

        updateUser({
            [event.id]: event.id,
        });

        event.users[user.id] = user.id;
        setEvents(events);

        setCurrDisplay("events");
    }

    const RemoveEvent = (e) => {
        e.preventDefault();
        // if (!e.target.value) return;
        
        if (Object.values(event.users).length == 1) {
            setEvents(events.filter((ev) => ev.id != event.id));

            updateEventList({
                [event.id]: null,
            });
        } else {
            updateEvent({
                [user.id]: null,
            });
    
            updateUser({
                [event.id]: null,
            });

            delete event.users[user.id]
        }

        setCurrDisplay("events");
    }


    return (
        <div className="event-card">
            <div className="calendar">
                <div className="calendar-month">{months[start.getMonth()]}</div>
                <div className="calendar-day">{start.getDate()}</div>
            </div>
            <div className="event-info">
                <div className="event-name">{event.name}</div>
                <div>
                    {months[start.getMonth()]} {start.getDate()}, {parseTimeString(start)} - {months[end.getMonth()]} {end.getDate()}, {parseTimeString(end)}
                </div>
                <div>
                    { participants } / 100000000000000000 participants
                </div>
            </div>
            <div className="event-icon">
                {
                    added
                    ? (<ActionIcon onClick={RemoveEvent} style={{ zIndex: "0" }}>
                                <RiIndeterminateCircleLine size={24} />
                            </ActionIcon>)
                    : (<ActionIcon onClick={JoinEvent} style={{ zIndex: "0" }}>
                                <RiAddCircleLine size={24} />
                            </ActionIcon>)
                }
            </div>

           

        </div>
    );
}

export default Event;