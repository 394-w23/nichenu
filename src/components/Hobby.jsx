import './Hobby.css';
import Tag from './Tag.jsx';
import { useEffect, useState } from 'react';
import { HiOutlineUserGroup } from "@react-icons/all-files/hi/HiOutlineUserGroup";

const Hobby = ({ hobby, openMessages }) => {
    return (
        <div className="hobby-card" onClick={() => openMessages(hobby)}>
            {hobby.img ? <img src={hobby.img}/> : <HiOutlineUserGroup className='hobby-img' size={70} />}
            <div className="hobby-info" >
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