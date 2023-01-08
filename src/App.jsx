import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';'./components/HobbyList.jsx'
import EventList from './components/EventList';'./components/EventList'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from '../firebase';
import { useEffect } from 'react';

const App = () => {
  const [data, error] = useDbData("/");
  const [events, setEvents] = useState([]);
  const [hobbies, setHobbies] = useState([]); 
  const [currList, setCurrList] = useState("hobbies");
  const listOptions = ["events","hobbies","mystuff"];

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="App">
      <Header />
      <EventList events={Object.values(data.events)}/>
      <HobbyList hobbies={Object.values(data.hobbies)} />
      <Navbar listOptions={listOptions} selection={currList} setSelection={setCurrList} />
    </div>
  );
};

export default App;
