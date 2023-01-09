import './Hobby.css';
import Tag from './Tag.jsx';
import { useEffect, useState } from 'react';

const Hobby = ({ hobby }) => {
    return (
        <div className="hobby-card">
            <img src={hobby.img}></img>
            <div className="hobby-info">
                <div className="hobby-name">{hobby.name}</div>
                <div>
                    {Object.values(hobby.tags).map(tag => <Tag key={tag + hobby.id} tagName={tag} />)}
                </div>
            </div>
        </div>
    );
}

export default Hobby;