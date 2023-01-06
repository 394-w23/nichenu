import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';'./components/HobbyList.jsx'
import EventList from './components/EventList';'./components/EventList'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from '../firebase';

const App = () => {
  const [data, error] = useDbData("/");
  const [hobbies, setHobbies] = useState([]);
  const [events, setEvents] = useState([]);
  const [currList,setCurrList] = useState(0);
  const listOptions = ["events","hobbies","mystuff"]

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="App">
      <Header />
      {Object.values(data.test)}
      <EventList events={events}/>
      <HobbyList hobbies={hobbies} />
      <Navbar listOptions={listOptions} selection={currList} setSelection={setCurrList} />
    </div>
  );
};

export default App;
