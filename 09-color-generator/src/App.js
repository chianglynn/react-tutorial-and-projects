import React, { useState } from 'react';
import SingleColor from './SingleColor';
import Values from 'values.js';

function App() {
  const defaultColor = '#f15025';

  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values(defaultColor).all(10));

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setError(false);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" className={`${error ? 'error' : null}`} value={color} onChange={(e) => setColor(e.target.value)} placeholder={defaultColor} />
          <button type="submit" className="btn">submit</button>
        </form>
      </section>
      <section className="colors">
        {/* Solution 1 for getting hex */}
        {/* {list.map((color, index) => <SingleColor key={index} {...color} index={index} hexColor={color.hex} />)} */}
        {/* Solution 2 for getting hex */}
        {list.map((color, index) => <SingleColor key={index} {...color} index={index} />)}
      </section>
    </>
  );
}

export default App;