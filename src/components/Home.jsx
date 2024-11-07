import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${query}`);
      setQuery('');
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <img src="/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png" alt="Bazar Logo" />
        <h1>Bazar Online</h1>
        <p>Busca algún producto que necesites...</p>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
