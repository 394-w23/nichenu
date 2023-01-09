import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';
import EventList from './components/EventList';
import ChatRoom from './components/ChatRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from './utils/firebase';

const App = () => {
  const [data, error] = useDbData("/");
  const [currList, setCurrList] = useState("hobbies");
  const listOptions = ["events","hobbies","mystuff"];

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="App">
      <Header />
      {
      currList === "events" ? <EventList eventList={Object.values(data.events)}/> 
      : currList === "hobbies" ? <HobbyList hobbyList={Object.values(data.hobbies)} /> 
      : <div></div>
      }
      <ChatRoom messageLog={data.hobbies["01"].message_chat}/>
      <Navbar listOptions={listOptions} selection={currList} setSelection={setCurrList} />
    </div>
  );
};

export default App;
