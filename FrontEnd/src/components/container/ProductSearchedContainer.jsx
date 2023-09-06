import ProductSearchedDisplay from "../display/ProductSearchedDisplay";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ProductSearchedContainer = () => {
  const [productData, setProductData] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const filteredOptions = searchParams.get("filteredOptions");

    useEffect(() => {
      fetch(`http://localhost:8080/v1/bundle/`)
        .then((response) => response.json())
        .then((data) => {
          const bundleNames = data.map((bundle) => bundle.name);
          const filteredBundleNames = bundleNames.filter((name) =>
            name.toLowerCase().includes(filteredOptions.toLowerCase())
          );
  
          setProductData(filteredBundleNames);
        })
        .catch((error) => console.error("Error fetching product data:", error));
    }, [filteredOptions]); // Agregar filteredOptions como dependencia

    console.log(productData)    
  return <ProductSearchedDisplay filteredOptions={filteredOptions}/>;
};

export default ProductSearchedContainer;