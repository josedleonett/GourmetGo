import React from "react";
import CardProductDisplay from "../display/CardProductDisplay";

const CardProductContainer = ({ img, title, description,categoryList }) => {
  return (
    <CardProductDisplay
      img={img}
      title={title}
      description={description}
      categoryList={categoryList}
    />
  );
};

export default CardProductContainer;
