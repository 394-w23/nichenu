import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';'./components/HobbyList.jsx'
import EventList from './components/EventList';'./components/EventList'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [hobbies, setHobbies] = useState([]);
  const [events, setEvents] = useState([]);
  const [currList,setCurrList] = useState(0);
  const listOptions = ["events","hobbies","mystuff"]

  return (
    <div className="App">
      <Header />
      <EventList events={events}/>
      <HobbyList hobbies={hobbies} />
      <Navbar listOptions={listOptions} selection={currList} setSelection={setCurrList} />
    </div>
  );
};

export default App;
