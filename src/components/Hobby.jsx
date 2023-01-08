import './Hobby.css';
import Tag from './Tag.jsx';
import {temp_ref} from '../../firebase';

const Hobby = ({ hobby }) => {
    console.log(Object.values(hobby.tags))
    return (
        <div className="hobby-card">
            <img src={temp_ref}></img>
            <div className="hobby-info">
                <div className="hobby-name">{hobby.name}</div>
                <div>
                    {Object.values(hobby.tags).map(tag => <Tag tagName={tag}/>)}
                </div>
            </div>
        </div>
    );
}

export default Hobby;