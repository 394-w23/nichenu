import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import HobbyList from './components/HobbyList';'./components/HobbyList.jsx'
import EventList from './components/EventList';'./components/EventList'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from '../firebase';

export const findUserDisplayName = (uid) => Object.values(users).filter(user => user.uid === uid)[0].display_name;

const App = () => {
  const [data, error] = useDbData("/");
  const [currList, setCurrList] = useState("hobbies");
  const listOptions = ["events","hobbies","mystuff"];

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  console.log(currList === 'hobbies')

  return (
    <div className="App">
      <Header />
      {
      currList === "events" ? <EventList eventList={Object.values(data.events)}/> 
      : currList === "hobbies" ? <HobbyList hobbyList={Object.values(data.hobbies)} /> 
      : <div></div>
      }
      <Navbar listOptions={listOptions} selection={currList} setSelection={setCurrList} />
    </div>
  );
};

export default App;
