import './Event.css'
import { useEffect, useState } from 'react';
import { parseTimeString, } from '../utils/helpers' // TODO: use moment js
import { RiArrowDownSLine } from "@react-icons/all-files/ri/RiArrowDownSLine";
import { RiArrowUpSLine } from "@react-icons/all-files/ri/RiArrowUpSLine";
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine";
import { RiIndeterminateCircleLine } from "@react-icons/all-files/ri/RiIndeterminateCircleLine";
import { ActionIcon, Button, Title, Text } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';
import { showNotification } from '@mantine/notifications';

const Event = ({ event, user, added, setCurrDisplay, setEvents, events, setHasEvents, setHobbies, hobbies }) => {
    const [updateEventList, resultEventList] = useDbUpdate(`/events/`);
    const [updateEvent, resultEvent] = useDbUpdate(`/events/${event.id}/users/`);
    const [updateUser, resultUser] = useDbUpdate(`/users/${user.id}/event_ids/`);
    const [showDescription, setShowDescription] = useState(false);
    let participants = Object.values(event.users).length
    const months = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const start = new Date(event.start_timestamp);
    const end = new Date(event.end_timestamp);
    // console.log(events.filter((ev) => ev.id == event.id))
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
        showNotification({
            title: `You joined the ${event.name} event!`,
            message: 'Go to "My Events" to see your event!',
            autoClose: 3000,
          })
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
        showNotification({
            title: `You left the ${event.name} event!`,
            message: 'Go to "Other Events" to rejoin this event!',
            autoClose: 3000,
          })
    }


    return (
        <div className={`big-event-card description-${showDescription}`} onClick={() => setShowDescription(!showDescription)}>
            <div className={`event-card description-${showDescription}`}>
                <div className="calendar">
                    <div className="calendar-month">{months[start.getMonth()]}</div>
                    <div className="calendar-day">{start.getDate()}</div>
                </div>
                <div className={`event-info description-${showDescription}`}>
                    {
                        showDescription ? <Title className="event-name" size="h5" lineClamp={2}>{event.name}</Title> :
                            <Title className="event-name" size="h5" lineClamp={1}>{event.name}</Title>
                    }
                    {
                        !showDescription ? <div className={`event-info-details description-${showDescription}`}>
                            <div>
                                {months[start.getMonth()]} {start.getDate()}, {parseTimeString(start)} - {months[end.getMonth()]} {end.getDate()}, {parseTimeString(end)}
                            </div>

                            <Text lineClamp={1}>
                                <i><u>Location</u></i>: {event.location}
                            </Text>
                        </div> : <></>
                    }

                    {/* <div>
                        {participants} participants
                    </div> */}
                </div>
                <div className="eventlist-buttons">
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
                                ? <Button data-cy={`leave-event-${event.name.replace(' ', '')}`} onClick={RemoveEvent} style={{ marginLeft: 5 }} size="xs" color="red">Leave</Button>
                                : <Button onClick={JoinEvent} style={{ marginLeft: 5 }} size="xs">Join</Button>
                        }
                    </div>
                </div>
            </div>
            {showDescription &&
                <div className='event-expandable'>
                    <Text className="event-description">{event.desc}</Text>
                    <div className="event-info-details">
                        <div>
                            {months[start.getMonth()]} {start.getDate()}, {parseTimeString(start)} - {months[end.getMonth()]} {end.getDate()}, {parseTimeString(end)}
                        </div>

                        <Text>
                            <i><u>Location</u></i>: {event.location}
                        </Text>

                        {event.hobby !== undefined ?
                            <div className="event-hobby-name">
                                <i><u>Associated Hobby</u></i>: {hobbies[event.hobby].name}
                            </div> : <></>
                        }

                        <div>
                            {participants} participant{participants>1 ? "s" : ""}
                        </div>
                        
                    </div>

                    
                </div>
            }
            <div className="carrot">
                {showDescription ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </div>
        </div>
    );
}

export default Event;