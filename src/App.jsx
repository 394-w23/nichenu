import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';
import EventList from './components/EventList';
import CreateHobby from './components/CreateHobby';
import CreateEvent from './components/CreateEvent';
import ChatRoom from './components/ChatRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData, useAuth, useDbUpdate } from './utils/firebase';
import { findUserDisplayName } from './utils/helpers';
import Auth from './components/Auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [data, error] = useDbData("/");
  const [currDisplay, setCurrDisplay] = useState("auth");
  const [hobby, setHobby] = useState("hobbies");
  const displayOptions = ["events", "hobbies", "auth"];
  const user = useAuth();
  const [update, result] = useDbUpdate(`/users/${user ? user.uid : "unknown"}`);
  // let userFromDB = user && data && data.users[user.uid];
  const [userFromDB, setUserFromDB] = useState()
  // let flag = true;

  useEffect(() => {
    if (user && data && currDisplay === "auth") {
      if (!data.users[user.uid]) {
        let userData = { name: user.displayName, id: user.uid, profilePicture: user.photoURL, event_ids: [], hobbies_ids: [], }
        update(userData)
        setUserFromDB(userData);
      } else {
        setUserFromDB(data.users[user.uid]);
      }
      setCurrDisplay('hobbies');
      // flag = false;
    } else if (!user && currDisplay !== "auth") {
      setCurrDisplay('auth')
    }
  }, [user, data])

  // useEffect(() => {
  //   setCurrDisplay('hobbies');
  //   console.log(user)
  //   console.log(flag)
  // }, [flag])

  const openMessages = (hobby) => {
    setHobby(hobby)
    setCurrDisplay("message")
  }

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;


  return (
    <div className="App">
      <Header currDisplay={currDisplay} setCurrDisplay={setCurrDisplay} />
      <div className="content">
        {
          currDisplay == "auth" ? <Auth setCurrDisplay={setCurrDisplay} /> :
            currDisplay === "events" ? <EventList eventList={data.events ? Object.values(data.events) : []} user={userFromDB} setCurrDisplay={setCurrDisplay} />
              // : currDisplay === "hobbies" ? <HobbyList hobbyList={data.hobbies} user={userFromDB} openMessages={openMessages}/> 
              : currDisplay === "hobbies" ? <HobbyList hobbyList={data.hobbies ? Object.values(data.hobbies).sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())) : []} user={userFromDB} openMessages={openMessages} setCurrDisplay={setCurrDisplay} />
                : currDisplay === "message" ? <ChatRoom hobby={hobby} users={Object.values(data.users)} user={userFromDB} setCurrDisplay={setCurrDisplay} />
                  : currDisplay === "createHobby" ? <CreateHobby user={userFromDB} setCurrDisplay={setCurrDisplay} />
                    : currDisplay === "createEvent" ? <CreateEvent user={userFromDB} setCurrDisplay={setCurrDisplay} />
                      : <div></div>
        }
      </div>
      {(currDisplay !== 'message' && currDisplay !== 'auth') && <Navbar displayOptions={displayOptions} selection={currDisplay} setSelection={setCurrDisplay} />}
    </div>
  );
};

export default App;
