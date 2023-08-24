import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Rating,
  Stack,
  Tooltip,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

const CardProductDisplay = ({
  id,
  img,
  title,
  description,
  categoryList,
  rating,
  numberDiners,
}) => {

  return (
    <Card raised>
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
