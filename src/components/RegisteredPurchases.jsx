import React, { useEffect, useState } from 'react';

function RegisteredPurchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sales`)
      .then((response) => response.json())
      .then((data) => setPurchases(data));
  }, []);

  return (
    <div className="container">
      <h2>Compras Registradas</h2>
      {purchases.length > 0 ? (
        <ul>
          {purchases.map((purchase, index) => (
            <li key={index}>
              <strong>{purchase.productTitle}</strong> - ${purchase.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay compras registradas.</p>
      )}
    </div>
  );
}

export default RegisteredPurchases;
