import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Asumiendo que estás utilizando React Router
import ProductDetailDisplay from '../display/ProductDetailDisplay';

const ProductDetailContainer = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/v1/bundle/${id}`)
      .then(response => response.json())
      .then(data => setProductData(data))
      .catch(error => console.error('Error fetching product data:', error));
  }, [id]);

  return (
    <ProductDetailDisplay productData={productData} />
  );
}

export default ProductDetailContainer;