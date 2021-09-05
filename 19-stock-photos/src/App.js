import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const fetchImages = useCallback(async () => {
    setLoading(true);

    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    let url;

    if (query) url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    else url = `${mainUrl}${clientID}${urlPage}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos(oldPhotos => {
        if (query && page === 1) return data.results;
        else if (query && page !== 1) return [...oldPhotos, ...data.results];
        else return [...oldPhotos, ...data];
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [page, fetchImages]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if ((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) setPage(oldPage => oldPage + 1);
    });
    return () => window.removeEventListener('scroll', event);
  }, [loading]);

  return (
    <main>
      <section className="search" onSubmit={handleSubmit}>
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className="submit-btn" ><FaSearch /></button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => <Photo key={index} {...photo} />)}
        </div>
      </section>
      {loading && <h2 className="loading">loading...</h2>}
    </main>
  );
}

export default App;