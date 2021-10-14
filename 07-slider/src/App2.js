import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

// Solution 2
function App() {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = useState(0);

    const prevSlide = () => setIndex(index <= 0 ? people.length - 1 : index - 1);

    // Reference: https://ithelp.ithome.com.tw/articles/10225504
    const nextSlide = useCallback(() => {
        const goToNextSlide = () => setIndex(index >= people.length - 1 ? 0 : index + 1);
        goToNextSlide();
    }, [index, people.length]);

    useEffect(() => {
        let slider = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(slider);
    }, [index, nextSlide]);

    return (
        <section className="section">
            <div className="title">
                <h2><span>/</span>reviews</h2>
            </div>
            <div className="section-center">
                {people.map((person, personIndex) => {
                    const { id, image, name, title, quote } = person;
                    let position = 'nextSlide';

                    if (personIndex === index) position = 'activeSlide';
                    if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) position = 'lastSlide';

                    return (
                        <article className={position} key={id}>
                            <img src={image} alt={name} className="person-img" />
                            <h4>{name}</h4>
                            <p className="title">{title}</p>
                            <p className="text">{quote}</p>
                            <FaQuoteRight className="icon" />
                        </article>
                    );
                })}
                <button className="prev" onClick={prevSlide}>
                    <FiChevronLeft />
                </button>
                <button className="next" onClick={nextSlide}>
                    <FiChevronRight />
                </button>
            </div>
        </section>
    );
}

export default App;