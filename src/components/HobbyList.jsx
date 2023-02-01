import Hobby from './Hobby.jsx';
import { useState } from 'react';
import './HobbyList.css';
import { Title, Divider } from '@mantine/core'

const HobbyList = ({ hobbyList, user, openMessages, setCurrDisplay }) => {
    const [hobbies, setHobbies] = useState(hobbyList); 
    const [hasHobbies, setHasHobbies] = useState(user.hobby_ids !== null);
    // let hasHobbies = true; //user.hobby_ids
    // let hasHobbies = user.hobby_ids;

    // console.log(hobbies)

    return (
        <div data-cy="hobby-list">
            <br></br>
            <Title order={2}>My Hobbies</Title>
            {
                hasHobbies 
                ? hobbies.filter((hobby) => Object.values(hobby.message_chat.users).includes(user.id)).map((hobby) => <Hobby key={hobby.id} hobby={hobby} user={user} openMessages={openMessages} added={true} setCurrDisplay={setCurrDisplay} setHobbies={setHobbies} hobbies={hobbies} setHasHobbies={setHasHobbies}/>)
                : <div className="empty-event-text">Go join hobbies!</div> 
            }

            <br></br>
            <Title order={2}>Other Hobbies</Title>
            {
                hasHobbies
                ? hobbies.filter((hobby) => !Object.values(hobby.message_chat.users).includes(user.id)).map((hobby) => <Hobby key={hobby.id} hobby={hobby} user={user} openMessages={openMessages} added={false} setCurrDisplay={setCurrDisplay} setHobbies={setHobbies} hobbies={hobbies} setHasHobbies={setHasHobbies}/>)
                : hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} user={user} openMessages={openMessages} added={false} setCurrDisplay={setCurrDisplay} setHobbies={setHobbies} hobbies={hobbies} setHasHobbies={setHasHobbies}/>)
            }
        </div>


        // <div>
        //     <br></br>
        //     <Title order={2}>My Hobbies</Title>
        //     {
        //         hasHobbies 
        //         ? hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} openMessages={openMessages} />)
        //         : <div className="empty-event-text">Go add events!</div> 
        //     }
        //     <br></br>

        //     {/* <Title order={2}>Other Hobbies</Title>
        //     {
        //         hasHobbies
        //         ? events.filter((event) => !Object.values(event.users).includes(user.id)).sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} />)
        //         : events.sort((x, y) => (new Date(x.start_timestamp) - new Date(y.start_timestamp))).map((event) => <Event key={event.id} event={event} user={user} added={false} setCurrDisplay={setCurrDisplay} setEvents={setEvents} events={events} />)
        //     } */}
        // </div>
    );
}

export default HobbyList;