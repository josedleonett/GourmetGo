import React from "react";
import CardProductDisplay from "../display/CardProductDisplay";

const  CardProductContainer = ({
  id,
  img,
  title,
  description,
  categoryList,
  rating,
  favorite
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
      favorite={favorite}
    />
  );
};

export default CardProductContainer;
