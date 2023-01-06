import { useState } from 'react';
import './App.css';
import './Header.jsx'
import './Navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';

const App = () => {
  const [hobbies, setHobbies] = useState(0);
  const [events, setEvents] = useState(0);
  const [currList,setCurrList] = useState(0);
  const listOptions = ["events","hobbies","mystuff"]

  return (
    <div className="App">
      <Header />
      <Navbar listOptions={listOptions} selection={currList} setSelection={setCurrList} />
    </div>
  );
};

export default App;
