import './Hobby.css'

const Hobby = ({ hobby }) => {
    return (
        <div className="hobby-card">
            <img href={hobby.img}></img>
            <div className="hobby-info">
                <div className="hobby-name">{hobby.name}</div>
                <div>
                    Tags
                </div>
            </div>
        </div>
    );
}

export default Hobby;