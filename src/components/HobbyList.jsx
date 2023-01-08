import Hobby from './Hobby.jsx'
import './HobbyList.css'

const HobbyList = ({ hobbies }) => {
    return (
        <div>
            {
                hobbies.map((hobby) => <Hobby key={hobby.id} hobby={hobby} />)
            }
        </div>
    );
}

export default HobbyList;