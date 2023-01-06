import { useState } from 'react';
import './App.css';
import './Header.jsx'
import './Navbar.jsx'
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';

const App = () => {
  const [hobbies, setHobbies] = useState(0);
  const [events, setEvents] = useState(0);

  return (
    <div className="App">
      <Header />
      <Navbar />
    </div>
  );
};

export default App;
