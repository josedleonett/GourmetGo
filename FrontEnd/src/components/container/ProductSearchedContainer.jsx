import ProductSearchedDisplay from "../display/ProductSearchedDisplay";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ProductSearchedContainer = () => {
  const [productData, setProductData] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const filteredOptions = searchParams.get("filteredOptions");

    console.log(filteredOptions)

    useEffect(() => {
      fetch(`http://localhost:8080/v1/bundle/`)
        .then((response) => response.json())
        .then((data) => {
          // Filtrar los datos según los términos de búsqueda
          const filteredData = data.filter((bundle) =>
            bundle.name.toLowerCase().includes(filteredOptions.toLowerCase())
          );
          setProductData(filteredData);
        })  
        .catch((error) => console.error("Error fetching product data:", error));
    }, [filteredOptions]); // Agregar filteredOptions como dependencia
     
  return <ProductSearchedDisplay listFiltered={productData}/>;
};

export default ProductSearchedContainer;