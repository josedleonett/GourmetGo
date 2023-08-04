import React from "react";
import CardProductDisplay from "../display/CardProductDisplay";

const CardProductContainer = ({ img, title, description }) => {
  return (
    <CardProductDisplay
      img={img}
      title={title}
      description={description}
    />
  );
};

export default CardProductContainer;
