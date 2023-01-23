import Hobby from './Hobby.jsx';
import { useState } from 'react';
import './HobbyList.css';
import { Title, Divider } from '@mantine/core'

const HobbyList = ({ hobbyList, user, openMessages }) => {
    const [hobbies, setHobbies] = useState(hobbyList); 

    let hasHobbies = true; //user.hobby_ids

    console.log(hobbies)

    return (
        // <div>
        //     {
        //         hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} openMessages={openMessages} />)
        //     }
        // </div>
        <div>
            <br></br>
            <Title order={2}>My Hobbies</Title>
            {
                hasHobbies 
                ? hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} openMessages={openMessages} />)
                : <div className="empty-event-text">Go add events!</div> 
            }
            <br></br>

            {/* <Title order={2}>Other Hobbies</Title>
            {
                hasHobbies
                ? events.filter((event) => !Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} />)
                : events.sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} />)
            } */}
        </div>
    );
}

export default HobbyList;