import CardProductDisplay from "../display/CardProductDisplay";

const  CardProductContainer = ({
  id,
  img,
  title,
  description,
  categoryList,
  rating,
  favorite,
  setIdToDelete
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
      setIdToDelete={setIdToDelete}
    />
  );
};

export default CardProductContainer;
