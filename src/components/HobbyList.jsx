import Hobby from './Hobby.jsx';
import { useState } from 'react';
import './HobbyList.css';

const HobbyList = ({ hobbyList }) => {
    const [hobbies, setHobbies] = useState(hobbyList); 

    return (
        <div>
            {
                hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} />)
            }
        </div>
    );
}

export default HobbyList;