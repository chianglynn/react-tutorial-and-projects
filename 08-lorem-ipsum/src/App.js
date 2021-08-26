import React, { useState } from 'react';
import data from './data';

function App() {
  console.log(data.length);
  // Solution 1
  const [count, setCount] = useState(0);
  // Solution 2
  // const [count, setCount] = useState(1);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = +count;

    // Solution 1
    if (amount <= 0) amount = 1;
    if (amount > data.length) amount = data.length;

    setText(data.slice(0, amount));
  };

  return (
    <section className="section-center">
      <h3>tried of boring lorem ipsum?</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">paragraphs: </label>
        {/* Solution 1 */}
        <input type="number" name="amount" id="amount" value={count} onChange={(e) => setCount(e.target.value)} />
        {/* Solution 2 */}
        {/* <input type="number" min="1" max={data.length} name="amount" id="amount" value={count} onChange={(e) => setCount(e.target.value)} /> */}
        <button type="submit" className="btn">generate</button>
      </form>
      <article className="lorem-text">
        {text.map((item, index) => <p key={index}>{item}</p>)}
      </article>
    </section>
  );
}

export default App;