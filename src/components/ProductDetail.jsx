import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  
  const handlePurchase = () => {
    if (product) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/addSale`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productTitle: product.title,
          productPrice: product.price,
          productThumbnail: product.thumbnail, // Incluir el thumbnail
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Compra registrada con éxito');
          } else {
            alert('Error al registrar la compra');
          }
        });
    }
  };

  return (
    product && (
      <div className="container">
        <SearchBar />
        <h2>{product.title}</h2>
        <div className="image-slider">
          <button onClick={handlePreviousImage}>◀️</button>
          <div className="image-container">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.title} image ${currentImageIndex + 1}`}
            />
          </div>
          <button onClick={handleNextImage}>▶️</button>
        </div>
        <p>{product.description}</p>
        <p>Categoria: {product.category}</p>
        <p>SKU: {product.sku}</p>
        <p>Precio: ${product.price}</p>
        <p>Envío: {product.shippingInformation}</p>
        <p>En Stock: {product.availabilityStatus}</p>

        <button onClick={handlePurchase} style={{width: '100%'}}>Comprar</button>

        <h3>Reseñas</h3>
        <div className="reviews">
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review">
                <strong>{review.reviewerName}</strong> ({review.rating}⭐)
                <p>{review.comment}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No hay reseñas.</p>
          )}
        </div>
      </div>
    )
  );
}

export default ProductDetail;
