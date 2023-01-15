import './Hobby.css';
import Tag from './Tag.jsx';
import { useEffect, useState } from 'react';

const Hobby = ({ hobby, openMessages }) => {
    return (
        <div className="hobby-card">
            <img src={hobby.img}></img>
            <div className="hobby-info" onClick={() => openMessages(hobby)}>
                <div className="hobby-name">{hobby.name}</div>
                <div>
                    {
                        hobby.tags
                        ? Object.values(hobby.tags).map(tag => <Tag key={tag + hobby.id} tagName={tag} />)
                        : <div></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Hobby;