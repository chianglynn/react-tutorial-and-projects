import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';

// Solution 1
// const SingleColor = ({ rgb, weight, hexColor, index }) => {
// Solution 2
const SingleColor = ({ rgb, weight, index }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(',');
  // Solution 2
  const hex = rgbToHex(...rgb);

  const copyHexValue = () => {
    setAlert(true);
    // Solution 1
    // navigator.clipboard.writeText(hexColor);
    // Solution 2
    navigator.clipboard.writeText(hex);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setAlert(false), 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article className={`color ${index > 10 && 'color-light'}`} style={{ backgroundColor: `rgb(${bcg})` }} onClick={copyHexValue}>
      <p className="percent-value">{weight}%</p>
      {/* Solution 1 */}
      {/* <p className="color-value">#{hexColor}</p> */}
      {/* Solution 2 */}
      <p className="color-value">{hex}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;