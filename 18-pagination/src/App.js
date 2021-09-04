import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';

function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  const handlePage = index => setPage(index);

  // Solution 1
  // const prevPage = () => page === 0 ? setPage(followers.length - 1) : setPage(page - 1);
  // const nextPage = () => page === followers.length - 1 ? setPage(0) : setPage(page + 1);
  // Solution 2
  const prevPage = () => setPage(page === 0 ? followers.length - 1 : page - 1);
  const nextPage = () => setPage(page === followers.length - 1 ? 0 : page + 1);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, data, page]);

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map(follower => <Follower key={follower.id} {...follower} />)}
        </div>
        {!loading &&
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>prev</button>
            {data.map((_, index) => <button key={index} className={`page-btn ${index === page && 'active-btn'}`} onClick={() => handlePage(index)}>{index + 1}</button>)}
            <button className="next-btn" onClick={nextPage}>next</button>
          </div>
        }
      </section>
    </main>
  );
}

export default App;