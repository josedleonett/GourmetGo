import React, { useState, useEffect, useMemo } from "react";
import HomeDisplay from "../display/HomeDisplay";

const HomeContainer = () => {
  const [categories, setCategories] = useState([]);
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/v1/category/")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
      
    fetch("http://localhost:8080/v1/bundle/getAllForCard")
      .then(response => response.json())
      .then(data => setBundles(data))
      .catch(error => console.error("Error fetching bundles:", error));
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedBundles = useMemo(() => bundles, [bundles]);

  return <HomeDisplay categories={memoizedCategories} bundles={memoizedBundles} />;
};

export default HomeContainer;