import { useState, useEffect, useMemo } from "react";
import HomeDisplay from "../display/HomeDisplay";
import { useCookies } from "react-cookie";
import jwtDecode from 'jwt-decode';

const HomeContainer = () => {
  const [categories, setCategories] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [categorieList, setCategorieList] = useState([]);
  const [bundleList, setBundleList] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  
  useEffect(() => {
    fetch("http://localhost:8080/v1/category/")
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        const categoryNames = data.map(category => ({ id: category.id, name: category.name, bundles: category.bundles }));
        setCategorieList(categoryNames);
      })
      .catch(error => console.error("Error fetching categories:", error));

    let decodedToken = null;

    if ((cookies !== undefined) && cookies.token) {
      decodedToken = jwtDecode(cookies.token);
    }

    if (decodedToken !== undefined && decodedToken !== null) {
      fetch(`http://localhost:8080/v1/bundle/byUser/${decodedToken.id}`)
        .then(response => response.json())
        .then(data => {
          setBundles(data);
          setBundleList(data.map(bundle => ({ id: bundle.id, name: bundle.name })));
        })
        .catch(error => console.error("Error fetching user bundles:", error));
    } else {
      fetch("http://localhost:8080/v1/bundle/")
        .then(response => response.json())
        .then(data => {
          setBundles(data);
          setBundleList(data.map(bundle => ({ id: bundle.id, name: bundle.name, categories: bundle.categories })));
        })
        .catch(error => console.error("Error fetching bundles:", error));
    }
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedBundles = useMemo(() => bundles, [bundles]);
  const memoizedCategorieList = useMemo(() => categorieList, [categorieList]);
  const memoizedBundleList = useMemo(() => bundleList, [bundleList]);

  return <HomeDisplay categories={memoizedCategories} bundles={memoizedBundles} 
  categorieList={memoizedCategorieList} bundleList={memoizedBundleList}/>;
};

export default HomeContainer;

