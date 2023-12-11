import React, { useState, useEffect } from 'react';

function ProductDetails({ id, onClose }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        console.log('Fetching product details for productId:', id);
        console.log("productdetails")
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        console.log('Response status:', response.status);
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const contentType = response.headers.get('content-type');
  
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not in JSON format.');
        }
  
        const productData = await response.json();
        console.log('Received product data:', productData);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    fetchProductDetails(id); // Call the function when the component mounts
  }, [id]);
  
  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Product Details</h3>
      <p><strong>Product ID:</strong> {product.id}</p>
      <p><strong>Title:</strong> {product.title}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Image:</strong> {product.image}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ProductDetails;
