import './Event.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon } from '@mantine/core';

const Event = ({ event }) => {
    const months = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const start = new Date(event.start_timestamp);
    const end = new Date(event.end_timestamp);

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

            {/* <div className="event-icon">
                <ActionIcon>
                    <RiAddCircleLine size={24} />
                </ActionIcon>
            </div> */}

        </div>
    );
}

export default Event;