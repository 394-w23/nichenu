import './Hobby.css';
import Tag from './Tag.jsx';
import { useEffect, useState } from 'react';
import { HiOutlineUserGroup } from "@react-icons/all-files/hi/HiOutlineUserGroup";
import { Button } from '@mantine/core';
import { useDbData, useDbUpdate } from '../utils/firebase';

const Hobby = ({ hobby, user, openMessages, added, setCurrDisplay, setHobbies, hobbies }) => {
    const [updateHobbyList, resultHobbyList] = useDbUpdate(`/hobbies/`); 
    const [updateHobby, resultHobby] = useDbUpdate(`/hobbies/${hobby.id}/message_chat/users/`);
    const [updateUser, resultUser] = useDbUpdate(`/users/${user.id}/hobby_ids/`);

    const JoinHobby = (e) => {
        e.preventDefault();
        // if (!e.target.value) return;

        updateHobby({
            [user.id]: user.id,
        });

        updateUser({
            [hobby.id]: hobby.id,
        });

        hobby.message_chat.users[user.id] = user.id;
        setHobbies(hobbies);

        setCurrDisplay("hobbies");
    }

    const LeaveHobby = (e) => {
        e.preventDefault();
        // if (!e.target.value) return;
        
        if (Object.values(hobby.message_chat.users).length == 1) {
            setHobbies(hobbies.filter((h) => h.id != hobby.id));

            updateHobbyList({
                [hobby.id]: null,
            });
        } else {
            updateHobby({
                [user.id]: null,
            });
    
            updateUser({
                [hobby.id]: null,
            });

            delete hobby.message_chat.users[user.id]
        }

        setCurrDisplay("hobbies");
    }


    return (
        <div className="hobby-card" onClick={() => openMessages(hobby)}>
            {hobby.img ? <img className="hobby-image" src={hobby.img}/> : 
            // <HiOutlineUserGroup className='hobby-img' size={70} />
            <img className="hobby-image" src="../../public/group.png" style={{width: "80%", padding: 10}}/>
            }
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
            <div>
                {
                    added
                    ? <Button onClick={LeaveHobby} style={{marginLeft: 5}} size="xs" color="red">Leave</Button>
                    : <Button onClick={JoinHobby} style={{marginLeft: 5}} size="xs">Join</Button>
                }
            </div>
            
            

        </div>
    );
}

export default Hobby;