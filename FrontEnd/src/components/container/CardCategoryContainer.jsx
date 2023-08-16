import React from "react";
import CardCategoryDisplay from "../display/CardCategoryDisplay";

const CardCategoryContainer = ({ id, img, title, description }) => {
  return (
    <CardCategoryDisplay
      id={id}
      img={img}
      title={title}
      description={description}
    />
  );
};

export default CardCategoryContainer;
