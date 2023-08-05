import React from "react";
import CardProductDisplay from "../display/CardProductDisplay";

const CardProductContainer = ({ img, title, description,categoryList, rating }) => {
  return (
    <CardProductDisplay
      img={img}
      title={title}
      description={description}
      categoryList={categoryList}
      rating={rating}
    />
  );
};

export default CardProductContainer;
