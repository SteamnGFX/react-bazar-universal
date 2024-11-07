import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function SearchResults() {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items?q=${query}`)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [query]);

  return (
    <div className="container">
      <SearchBar />
      <h2>Resultados de la búsqueda: "{query}"</h2>
      <div className="search-results">
        {items.map((item) => (
          <div key={item.id} className="product-card">
            <Link to={`/item/${item.id}`}>
              <img src={item.thumbnail} alt={item.title} />
              <h3>{item.title}</h3>
              <p>${item.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
