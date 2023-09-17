import { useMediaQuery, useTheme } from "@mui/material";
import CardProductGridDisplay from "../display/CardProductGridDisplay";

const CardProductGridContainer = ({ list, setIdToDelete }) => {
  // Verificar si list es null o undefined y manejarlo adecuadamente
  if (list === null || list === undefined) {
    return null;
  }

  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  const theme = useTheme();
  const screenIsUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const shuffledListProduct = shuffleArray(list);

  const chunkedProductList = chunk(shuffledListProduct, screenIsUpLg ? 10 : 9);

  return <CardProductGridDisplay list={chunkedProductList} setIdToDelete={setIdToDelete}/>;
};

export default CardProductGridContainer;