import './Hobby.css';
import Tag from './Tag.jsx';
import { useEffect, useState } from 'react';
// import { HiOutlineChatBubbleLeftEllipsis } from "@react-icons/all-files/hi/HiOutlineChatBubbleLeftEllipsis";
import { HiOutlineChatAlt } from "@react-icons/all-files/hi/HiOutlineChatAlt";
import { HiOutlineChatAlt2 } from "@react-icons/all-files/hi/HiOutlineChatAlt2";
import { RiArrowDownSLine } from "@react-icons/all-files/ri/RiArrowDownSLine";
import { RiArrowUpSLine } from "@react-icons/all-files/ri/RiArrowUpSLine";
import { HiChatAlt2 } from "@react-icons/all-files/hi/HiChatAlt2";
import { Button, Modal, ActionIcon, Title, Text } from '@mantine/core';
import { useDbData, useDbUpdate } from '../utils/firebase';
import { showNotification } from '@mantine/notifications';

const Hobby = ({ hobby, user, openMessages, added, setCurrDisplay, setHobbies, hobbies, setHasHobbies }) => {
    const [updateHobbyList, resultHobbyList] = useDbUpdate(`/hobbies/`);
    const [updateHobby, resultHobby] = useDbUpdate(`/hobbies/${hobby.id}/message_chat/users/`);
    const [updateUser, resultUser] = useDbUpdate(`/users/${user.id}/hobby_ids/`);
    const [modalOpened, setModalOpened] = useState(false);

    const [showDescription, setShowDescription] = useState(false);

    const JoinHobby = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // if (!e.target.value) return;

        updateHobby({
            [user.id]: user.id,
        });

        updateUser({
            [hobby.id]: hobby.id,
        });

        hobby.message_chat.users[user.id] = user.id;
        setHobbies(hobbies);
        setHasHobbies(user.hobby_ids !== null)

        setCurrDisplay("hobbies");
        showNotification({
            title: `You joined the ${hobby.name} hobby!`,
            message: 'Go to "My Hobbies" to see your hobby!',
            autoClose: 3000,
        })
    }

    const LeaveHobby = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        showNotification({
            title: `You left the ${hobby.name} hobby!`,
            message: 'Go to "Other Hobbies" to rejoin this hobby!',
            autoClose: 3000,
        })
    }

    const openChat = (e) => {
        if (added) {
            openMessages(hobby);
        } else {
            setModalOpened(true);
        }
    }





    return (
        <div className={`big-hobby-card description-${showDescription}`} data-cy={`hobby-expand-${hobby.name.replaceAll(' ', '-')}`} onClick={() => setShowDescription(!showDescription)}>
            {/* <Modal opened={modalOpened} onClose={() => setModalOpened(false)} withCloseButton={false} overlayColor={"#222"} overlayOpacity={0.45}>
                Join the hobby to chat with its members!
            </Modal> */}

            <div className={`hobby-card description-${showDescription}`}>
                {hobby.img ? <img className="hobby-image" referrerPolicy="no-referrer" src={hobby.img} /> :
                    // <HiOutlineUserGroup className='hobby-img' size={70} />
                    <img className="hobby-image" src="/group.png" style={{ width: "80%", padding: 15 }} />
                }
                <div className={`hobby-info description-${showDescription}`}>

                    {
                        showDescription ? <Title className="hobby-name" lineClamp={2}>{hobby.name}</Title> :
                            <Title className="hobby-name" lineClamp={1}>{hobby.name}</Title>
                    }

                    <div className='hobby-tags'>
                        {
                            hobby.tags
                                ?
                                !showDescription && Object.values(hobby.tags).slice(0, 2).map(tag => <Tag key={tag + hobby.id} tagName={tag} />)
                                : <div></div>
                        }
                    </div>
                </div>
                {added && showDescription ?
                    <div className={`hobbylist-buttons description-${showDescription} added-${added}`}>
                        <ActionIcon data-cy="open-chatroom" className="leave" size="xl" onClick={openChat} color="blue">
                            <HiChatAlt2 size={32} style={{ transform: "scale(1.2)" }} />
                        </ActionIcon>
                    </div> :
                    <div className={`hobbylist-buttons description-${showDescription}`}>{
                        added
                            ? <ActionIcon data-cy="open-chatroom" className="leave" size="xl" onClick={openChat} color="blue">
                                <HiChatAlt2 size={32} style={{ transform: "scale(1.2)" }} />
                            </ActionIcon>
                            // ? <Button onClick={openChat} style={{marginLeft: 5}} size="xs">Chat</Button>
                            : <Button data-cy={`join-hobby-${hobby.name.replaceAll(' ', '-')}`} onClick={JoinHobby} style={{ marginLeft: 5 }} size="xs">Join</Button>
                    }</div>
                }

            </div>
            {showDescription &&
                <div className="hobby-expandable-cols">
                    <div className='hobby-expandable'>

                        <Text>{hobby.desc}</Text>

                        <div className='hobby-tags'>
                            {
                                hobby.tags
                                    ?
                                    showDescription && Object.values(hobby.tags).sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase())).map(tag => <Tag key={tag + hobby.id} tagName={tag} />)
                                    : <div></div>
                            }
                        </div>

                    </div>
                    {
                        added && <div>
                            <Button data-cy={`leave-hobby-${hobby.name.replaceAll(' ', '-')}`} onClick={LeaveHobby} style={{ marginTop: "10%" }} size="xs" color="red">Leave</Button>
                        </div>
                    }
                </div>
            }
            <div className="carrot">
                {showDescription ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </div>
        </div>

    );
}

export default Hobby;