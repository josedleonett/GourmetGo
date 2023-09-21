import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActionArea, Rating, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { API_BASE_IMAGE_URL, API_BASE_URL } from "../../utils/urlApis";

const CardProductDisplay = ({
  id,
  img,
  title,
  description,
  categoryList,
  rating,
  numberDiners,
  favorite,
  setIdToDelete
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  let decodedToken = null;

  if (cookies !== undefined && cookies.token) {
    decodedToken = jwtDecode(cookies.token);
  }
  const handleIconClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    const bundleId = id;
    if (isFavorite) {
      setIdToDelete(id)
      fetch(
        `${API_BASE_URL}user/${decodedToken.id}/favorites/${bundleId}`,
        {
          method: "DELETE",
        }
      );
    } else {
      fetch(
        `${API_BASE_URL}user/${decodedToken.id}/favorites/${bundleId}`,
        {
          method: "POST",
        }
      );
    }
  };

  return (
    <Card
      raised
    >
      {decodedToken ? (
        <span>
          <Tooltip
            title={isFavorite ? "Delete from favorites" : "Add to favorites"}
            placement="top"
          >
            {isFavorite ? (
              <FavoriteIcon
                onClick={handleIconClick}
                sx={{
                  position: "absolute",
                  zIndex: 5,
                  cursor: "pointer",
                  color: "error.main",
                }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handleIconClick}
                sx={{
                  position: "absolute",
                  zIndex: 5,
                  cursor: "pointer",
                  color: "error.main",
                }}
              />
            )}
          </Tooltip>
        </span>
      ) : (
        <span></span>
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
              image={`${API_BASE_IMAGE_URL}${img}`}
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
