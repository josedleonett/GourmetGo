import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from '@mui/icons-material/Star';
import {
  CardActionArea,
  Rating,
  Stack,
  Tooltip,
  Box
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useState } from "react"

const CardProductDisplay = ({
  id,
  img,
  title,
  description,
  categoryList,
  rating,
  numberDiners,
}) => {


  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleIconClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <Card raised onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      {isHovered && (
        <Tooltip  title={isFavorite ? "Delete from favoritos" : "Add to favorites"} placement="top">
          {isFavorite ? (
          <StarIcon
          onClick={handleIconClick}
            sx={{
              position: "absolute",
              zIndex: 2,
              cursor: "pointer",
            }}
          /> ) : (
            <StarBorderIcon
            onClick={handleIconClick}
              sx={{
                position: "absolute",
                zIndex: 2,
                cursor: 'pointer',
              }}
            />
          )}
        </Tooltip>
         )}
            {Array.isArray(img) && img.length > 0 ? (
        <Carousel
          autoPlay={false}
          animation="slide"
          indicatorContainerProps={{
            style: { position: "absolute", top: "115px", zIndex: 1 },
          }}
        >
          {img.map((img, i) => (
            <CardMedia
              key={`image-${i}`}
              component="img"
              height="150px"
              id={`image-${i}`}
              image={`http://localhost:8080/asset/get-object?key=${img}`}
              alt={`image-${i}`}
              sx={{ position: "relative" }}
            />
          ))}
        </Carousel>
      ) : (
        <p>No images available</p>
      )}
      <CardActionArea
        LinkComponent={Link}
        to={`/product/${id}`}
        sx={{
          "& .MuiCardActionArea-focusHighlight": {
            backgroundColor: "transparent",
          },
          minHeight: "200px",
        }}
      >
        <CardContent sx={{ minHeight: "160px" }}>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Rating name="valoration" value={rating} readOnly precision={0.5} />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProductDisplay;
