import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0);
  const { id, name, job, image, text } = people[index];

  const prevPerson = () => {
    // Method 1
    // setIndex(index > 0 ? index - 1 : people.length - 1);
    // Method 2
    // setIndex(index === 0 ? people.length - 1 : index - 1);
    // Method 3
    setIndex(index <= 0 ? people.length - 1 : index - 1);
  };

  const nextPerson = () => {
    // Method 1
    // setIndex(index < people.length - 1 ? index + 1 : 0);
    // Method 2
    // setIndex(index === people.length - 1 ? 0 : index + 1);
    // Method 3
    setIndex(index >= people.length - 1 ? 0 : index + 1);
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * people.length);
  };

  const randomPerson = () => {
    let randomNumber = generateRandomNumber();
    if (randomNumber === index) randomNumber = generateRandomNumber();
    setIndex(randomNumber);
  };

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomPerson}>suprise me</button>
    </article>
  );
};

export default Review;