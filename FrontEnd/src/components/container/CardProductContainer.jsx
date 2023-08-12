import React from "react";
import CardProductDisplay from "../display/CardProductDisplay";

const CardProductContainer = ({
  id,
  img,
  title,
  description,
  categoryList,
  rating,
  numberDiners,
}) => {
  return (
    <CardProductDisplay
      key={id}
      id={id}
      img={img}
      title={title}
      description={description}
      categoryList={categoryList}
      rating={rating}
      numberDiners={numberDiners}
    />
  );
};

export default CardProductContainer;
