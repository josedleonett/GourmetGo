import { useState, useEffect, useMemo } from "react";
import HomeDisplay from "../display/HomeDisplay";

const HomeContainer = () => {
  const [categories, setCategories] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [categorieList, setCategorieList] = useState([]);
  const [bundleList, setBundleList] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/v1/category/")
    .then(response => response.json())
    .then(data => {
      setCategories(data);
      const categoryNames = data.map(category => category.name);
      setCategorieList(categoryNames);
    })
    .catch(error => console.error("Error fetching categories:", error));

    const userId = localStorage.getItem("id")
      
    fetch(`http://localhost:8080/v1/bundle/byUser/${userId}`)
    .then(response => response.json())
    .then(data => {
      setBundles(data);
      const bundleNames = data.map(bundle => bundle.name);
      setBundleList(bundleNames);
    })
    .catch(error => console.error("Error fetching bundles:", error));
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedBundles = useMemo(() => bundles, [bundles]);
  const memoizedCategorieList = useMemo(() => categorieList, [categorieList]);
  const memoizedBundleList = useMemo(() => bundleList, [bundleList]);

  return <HomeDisplay categories={memoizedCategories} bundles={memoizedBundles} 
  categorieList={memoizedCategorieList} bundleList={memoizedBundleList}/>;
};

export default HomeContainer;