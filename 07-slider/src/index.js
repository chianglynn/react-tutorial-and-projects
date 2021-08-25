import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Solution 1
import App2 from './App2'; // Solution 2

ReactDOM.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>,
  document.getElementById('root')
);