import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ProductDetailDisplay from "../display/ProductDetailDisplay";
import jwtDecode from "jwt-decode";

const ProductDetailContainer = ({ accessToken }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [dates, setDates] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    fetch(`http://localhost:8080/v1/booking/dates`)
      .then((response) => response.json())
      .then((data) => setDates(data))
      .catch((error) => console.error("Error fetching booking dates:", error));
  }, [id, cookies.token]);

  useEffect(() => {
    let decodedToken
    if (cookies.token !== undefined ) {
      decodedToken = jwtDecode(cookies.token);
        fetch(
          `http://localhost:8080/v1/bundle/${decodedToken.id}/bundleDetail/${id}`
        )
          .then((response) => response.json())
          .then((data) => {
            setProductData(data);
          })
          .catch((error) =>
            console.error("Error fetching product data:", error)
          );
      } else {
        fetch(`http://localhost:8080/v1/bundle/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setProductData(data);
          })
          .catch((error) =>
            console.error("Error fetching product data:", error)
          );
    }
  }, [id, cookies.token]);

  console.log(dates)

  return (
    <ProductDetailDisplay
      productData={productData}
      dates={dates}
      accessToken={accessToken}
    />
  );
};

export default React.memo(ProductDetailContainer);