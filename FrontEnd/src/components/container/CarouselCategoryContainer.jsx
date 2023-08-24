import React from "react";
import CarouselCategoryDisplay from "../display/CarouselCategoryDisplay";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const CarouselCategoryContainer = ({ elementsList }) => {
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const theme = useTheme();
  const screenIsUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const chunkedCategories = chunk(elementsList, screenIsUpLg ? 5 : 1);
  console.log(chunkedCategories)
  return <CarouselCategoryDisplay elementsGroup={chunkedCategories} />;
};

export default CarouselCategoryContainer;
