import React, { useEffect, useState } from 'react';

function PurchaseList() {
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
        <ul className="purchase-list">
          {purchases.map((purchase) => (
            <li key={purchase._id} className="purchase-item">
              <img src={purchase.thumbnail} alt={purchase.title} className="purchase-image" />
              <div className="purchase-details">
                <h3>{purchase.title}</h3>
                <p>Precio: ${purchase.price}</p>
                <p>Fecha de Compra: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay compras registradas.</p>
      )}
    </div>
  );
}

export default PurchaseList;
