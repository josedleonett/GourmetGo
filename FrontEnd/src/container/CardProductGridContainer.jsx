import React from "react";
import CardCategoryContainer from "./CardCategoryContainer";
import { Grid } from "@mui/material";
import CardProductContainer from "./CardProductContainer";
import CardProductGridDisplay from "../display/CardProductGridDisplay";

const CardProductGridContainer = ({ list }) => {
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
      }
      return array;
    }

    const shuffledListProduct = shuffleArray(list)
  
    const chunkedProductList = chunk(shuffledListProduct, 10)
    console.log(chunkedProductList);

  return (
    <CardProductGridDisplay list={chunkedProductList}/>
  );
};

export default CardProductGridContainer;
