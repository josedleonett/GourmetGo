import React from "react";
import CardCategoryDisplay from "../display/CardCategoryDisplay";

const CardCategoryContainer = ({ img, title, description }) => {
  return (
    <CardCategoryDisplay
      img={img}
      title={title}
      description={description}
    />
  );
};

export default CardCategoryContainer;
