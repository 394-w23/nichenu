import './Event.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine";
import { RiIndeterminateCircleLine } from "@react-icons/all-files/ri/RiIndeterminateCircleLine";
import { ActionIcon, Button, Title } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';

const Event = ({ event, user, added, setCurrDisplay, setEvents, events, setHasEvents }) => {
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
        setHasEvents(user.event_ids !== null)

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
            
            updateUser({
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
        setHasEvents(user.event_ids !== null)
        setCurrDisplay("events");
    }


    return (
        <div className="event-card">
            <div className="calendar">
                <div className="calendar-month">{months[start.getMonth()]}</div>
                <div className="calendar-day">{start.getDate()}</div>
            </div>
            <div className="event-info">
                <Title className="event-name" size="h5" lineClamp={1}>{event.name}</Title>
                {/* <div className="event-name">{event.name}</div> */}
                <div>
                    {months[start.getMonth()]} {start.getDate()}, {parseTimeString(start)} - {months[end.getMonth()]} {end.getDate()}, {parseTimeString(end)}
                </div>
                <div>
                    { participants } participants
                </div>
            </div>
            <div className="event-icon">
                {
                    // added
                    // ? (<ActionIcon onClick={RemoveEvent} style={{ zIndex: "0" }}>
                    //             <RiIndeterminateCircleLine size={24} />
                    //         </ActionIcon>)
                    // : (<ActionIcon onClick={JoinEvent} style={{ zIndex: "0" }}>
                    //             <RiAddCircleLine size={24} />
                    //         </ActionIcon>)

                    added
                    ? <Button onClick={RemoveEvent} style={{ marginLeft: 5}} size="xs" color="red">Leave</Button>
                    : <Button onClick={JoinEvent} style={{ marginLeft: 5 }} size="xs">Join</Button>
                }
            </div>

           

        </div>
    );
}

export default Event;