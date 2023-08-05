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
  
    const chunkedList = chunk(list, 10)
    console.log(chunkedList);

  return (
    <CardProductGridDisplay list={chunkedList}/>
  );
};

export default CardProductGridContainer;
