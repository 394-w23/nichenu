import './Hobby.css'
import Tag from './Tag.jsx'

const Hobby = ({ hobby }) => {
    console.log(Object.values(hobby.tags))
    return (
        <div className="hobby-card">
            <img href={hobby.img}></img>
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