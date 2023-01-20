import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';
import EventList from './components/EventList';
import CreateHobby from './components/CreateHobby';
import CreateEvent from './components/CreateEvent';
import ChatRoom from './components/ChatRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from './utils/firebase';
import { findUserDisplayName } from './utils/helpers';
import Auth from './components/Auth';

const App = () => {
  const [data, error] = useDbData("/");
  const [currDisplay, setCurrDisplay] = useState("auth");
  const [hobby, setHobby] = useState("hobbies");
  const [currUser, setCurrUser] = useState();
  const displayOptions = ["events","hobbies","auth"];

  const openMessages= (hobby) => {
    setHobby(hobby)
    setCurrDisplay("message")
  }
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  // setCurrUser(Object.values(data.users).filter(user=>user.id===1001))

  return (
    <div className="App">
      <Header currDisplay={currDisplay} setCurrDisplay={setCurrDisplay}/>
      <div className="content">
        {

          currDisplay == "auth" ? <Auth setCurrDisplay={setCurrDisplay}/>:
          currDisplay === "events" ? <EventList eventList={Object.values(data.events)} user={currUser} /> 
          : currDisplay === "hobbies" ? <HobbyList hobbyList={Object.values(data.hobbies).sort((a,b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))} openMessages={openMessages}/> 
          : currDisplay === "message" ? <ChatRoom hobby={hobby} users={Object.values(data.users)}/>
          : currDisplay === "createHobby" ? <CreateHobby user={currUser} setCurrDisplay={setCurrDisplay}/>
          : currDisplay === "createEvent" ? <CreateEvent user={currUser} setCurrDisplay={setCurrDisplay}/>
          : <div></div>
        }
      </div>
      { (currDisplay !== 'message' && currDisplay !== 'auth') && <Navbar displayOptions={displayOptions} selection={currDisplay} setSelection={setCurrDisplay} />}
    </div>
  );
};

export default App;
