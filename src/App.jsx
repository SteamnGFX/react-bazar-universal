import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import ProductDetail from './components/ProductDetail';
import PurchaseList from './components/PurchaseList';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/sales" className="nav-link">Lista de Compras</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/item/:id" element={<ProductDetail />} />
          <Route path="/sales" element={<PurchaseList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
