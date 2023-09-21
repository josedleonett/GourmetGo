import ProductSearchedDisplay from "../display/ProductSearchedDisplay";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ProductSearchedContainer = () => {
  const [productData, setProductData] = useState(null);
  const [categorieList, setCategorieList] = useState([]);
  const [bundleList, setBundleList] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filteredOptions = searchParams.get("filteredOptions");
  const filteredId = searchParams.get("selectedFiltersId");

  useEffect(() => {
    fetch("http://localhost:8080/v1/category/")
    .then(response => response.json())
    .then(data => {;
      const categoryNames = data.map(category => ({ id: category.id, name: category.name, bundles: category.bundles }));
      setCategorieList(categoryNames);
    })
    .catch(error => console.error("Error fetching categories:", error));
    fetch(`http://localhost:8080/v1/bundle/`)
      .then((response) => response.json())
      .then((data) => {
        const categoryIds = filteredId ? filteredId.split(";") : [];
        setBundleList(data.map(bundle => ({ id: bundle.id, name: bundle.name })));
        const filteredData = data.filter((bundle) => {
          const matchesOptions = bundle.name.toLowerCase().includes(filteredOptions.toLowerCase());
          const matchesCategories = categoryIds.length === 0 || bundle.categories.some((category) => categoryIds.includes(category.id.toString()));
          
          return matchesOptions && matchesCategories;
        });
        setProductData(filteredData);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [filteredOptions, filteredId]);

  return <ProductSearchedDisplay listFiltered={productData} categorieList={categorieList} bundleList={bundleList}/>;
};

export default ProductSearchedContainer;