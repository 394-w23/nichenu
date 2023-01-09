import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';
import EventList from './components/EventList';
import ChatRoom from './components/ChatRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from './utils/firebase';
import { findUserDisplayName } from './utils/helpers';

const App = () => {
  const [data, error] = useDbData("/");
  const [currDisplay, setCurrDisplay] = useState("hobbies");
  const [messageLog, setMessageLog] = useState("hobbies");
  const displayOptions = ["events","hobbies"];

  const openMessages= (messageLog) => {
    setMessageLog(messageLog)
    setCurrDisplay("message")
  }
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="App">
      <Header currDisplay={currDisplay} setCurrDisplay={setCurrDisplay}/>
      {
      currDisplay === "events" ? <EventList eventList={Object.values(data.events)}/> 
      : currDisplay === "hobbies" ? <HobbyList hobbyList={Object.values(data.hobbies)} openMessages={openMessages}/> 
      : currDisplay === "message" ? <ChatRoom messageLog={messageLog} users={Object.values(data.users)}/>
      : <div></div>
      }
      <Navbar displayOptions={displayOptions} selection={currDisplay} setSelection={setCurrDisplay} />
    </div>
  );
};

export default App;
