import Hobby from './Hobby.jsx';
import { useState } from 'react';
import './HobbyList.css';
import { Title, Divider, TextInput } from '@mantine/core'
import { HiSearch } from "@react-icons/all-files/hi/HiSearch";

const HobbyList = ({ hobbyList, user, openMessages, setCurrDisplay }) => {
    const [hobbies, setHobbies] = useState(hobbyList);
    const [hasHobbies, setHasHobbies] = useState(user.hobby_ids !== null);
    const [query, setquery] = useState('')
    const handleChange = (e) => {
        setquery(e.target.value)
        setHobbies(hobbyList.filter(hobby => hobby.name.toLowerCase().includes((e.target.value).toLowerCase())))
    }

    return (
        <div data-cy="hobby-list">
            <div className="search-bar-hobbies">
                <form>
                    <TextInput type="search" placeholder="Search" icon={<HiSearch></HiSearch>} value={query} onChange={handleChange} />
                </form>
            </div>

            <div data-cy="my-hobbies">
                <Title order={2}>My Hobbies</Title>
                {
                    hasHobbies
                        ? hobbies.filter((hobby) => Object.values(hobby.message_chat.users).includes(user.id)).map((hobby) => <Hobby key={hobby.id} hobby={hobby} user={user} openMessages={openMessages} added={true} setCurrDisplay={setCurrDisplay} setHobbies={setHobbies} hobbies={hobbies} setHasHobbies={setHasHobbies} />)
                        : <div className="empty-event-text">Go join hobbies!</div>
                }

            </div>
            <div data-cy="other-hobbies">
                <Title order={2}>Other Hobbies</Title>
                {
                    hasHobbies
                        ? hobbies.filter((hobby) => !Object.values(hobby.message_chat.users).includes(user.id)).map((hobby) => <Hobby key={hobby.id} hobby={hobby} user={user} openMessages={openMessages} added={false} setCurrDisplay={setCurrDisplay} setHobbies={setHobbies} hobbies={hobbies} setHasHobbies={setHasHobbies} />)
                        : hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} user={user} openMessages={openMessages} added={false} setCurrDisplay={setCurrDisplay} setHobbies={setHobbies} hobbies={hobbies} setHasHobbies={setHasHobbies} />)
                }
            </div>
            <br></br>

        </div>
    );
}

export default HobbyList;