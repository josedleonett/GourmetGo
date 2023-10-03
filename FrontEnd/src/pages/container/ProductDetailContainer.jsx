import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ProductDetailDisplay from "../display/ProductDetailDisplay";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../../utils/urlApis";

const ProductDetailContainer = ({ accessToken }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [dates, setDates] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    fetch(`${API_BASE_URL}booking/dates`)
      .then((response) => response.json())
      .then((data) => setDates(data))
      .catch((error) => console.error("Error fetching booking dates:", error));
  }, [id, cookies.token]);

  useEffect(() => {
    let decodedToken
    if (cookies.token !== undefined ) {
      decodedToken = jwtDecode(cookies.token);
        fetch(
          `${API_BASE_URL}bundle/${decodedToken.id}/bundleDetail/${id}`
        )
          .then((response) => response.json())
          .then((data) => {
            setProductData(data);
          })
          .catch((error) =>
            console.error("Error fetching product data:", error)
          );
      } else {
        fetch(`${API_BASE_URL}bundle/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setProductData(data);
          })
          .catch((error) =>
            console.error("Error fetching product data:", error)
          );
    }
  }, [id, cookies.token]);

  return (
    <ProductDetailDisplay
      productData={productData}
      setProductData={setProductData}
      dates={dates}
      accessToken={accessToken}
    />
  );
};

export default React.memo(ProductDetailContainer);