import './Event.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';

const Event = ({ event, user }) => {
    const [updateEvent, resultEvent] = useDbUpdate(`/events/${event.id}/users/${user.id}`);
    const [updateUser, resultUser] = useDbUpdate(`/users/${user.id}/event_ids/${event.id}`);

    const months = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const start = new Date(event.start_timestamp);
    const end = new Date(event.end_timestamp);

    const JoinEvent = (e) => {
        e.preventDefault();
        // if (!e.target.value) return;

        // const [update, result] = useDbUpdate(`/events/${event.id}/users/${user.id}`);
        updateEvent({
            id: user.id,
        });

        updateUser({
            id: event.id,
        });
        //   e.target.reset();
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
                    {parseTimeString(start)} - {parseTimeString(end)}
                </div>
            </div>
            <div className="event-icon">
                <ActionIcon onClick={JoinEvent} style={{ zIndex: "0" }}>
                    <RiAddCircleLine size={24} />
                </ActionIcon>
            </div>

           

        </div>
    );
}

export default Event;