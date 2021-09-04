import React, { useState, useEffect } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const { label } = e.target.dataset;
      setTitle(label);
      setValue(person[label]);
    }
  };

  const getPerson = async () => {
    setLoading(true);

    const response = await fetch(url);
    const data = await response.json();

    const person = data.results[0];
    const { large: image } = person.picture;
    const { first, last } = person.name;
    const { dob: { age } } = person;
    const { street: { number, name } } = person.location;
    const { email, phone } = person;
    const { login: { password } } = person;
    const newPerson = { image, name: `${first} ${last}`, age, street: `${number} ${name}`, email, phone, password };

    setPerson(newPerson);
    setTitle('name');
    setValue(newPerson.name);
    setLoading(false);
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={(person && person.image) || defaultImage} alt="random user" className="user-img" />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleValue}><FaUser /></button>
            <button className="icon" data-label="email" onMouseOver={handleValue}><FaEnvelopeOpen /></button>
            <button className="icon" data-label="age" onMouseOver={handleValue}><FaCalendarTimes /></button>
            <button className="icon" data-label="street" onMouseOver={handleValue}><FaMap /></button>
            <button className="icon" data-label="phone" onMouseOver={handleValue}><FaPhone /></button>
            <button className="icon" data-label="password" onMouseOver={handleValue}><FaLock /></button>
          </div>
          <button type="button" className="btn" onClick={getPerson}>{loading ? 'loading...' : 'random user'}</button>
        </div>
      </div>
    </main>
  );
}

export default App;