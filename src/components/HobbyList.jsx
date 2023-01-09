import Hobby from './Hobby.jsx';
import { useState } from 'react';
import './HobbyList.css';

const HobbyList = ({ hobbyList, openMessages }) => {
    const [hobbies, setHobbies] = useState(hobbyList); 

    return (
        <div>
            {
                hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} openMessages={openMessages} />)
            }
        </div>
    );
}

export default HobbyList;