import React from "react";
import CardProductDisplay from "../display/CardProductDisplay";

const  CardProductContainer = ({
  id,
  img,
  title,
  description,
  categoryList,
  rating,
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
    />
  );
};

export default CardProductContainer;
