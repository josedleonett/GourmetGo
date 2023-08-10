import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Chip,
  Grid,
  Rating,
  Stack,
  Tooltip,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import CardCategoryContainer from "../container/CardCategoryContainer";

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
      <Carousel
        autoPlay={false}
        indicatorContainerProps={{
          style: { position: "absolute", top: "115px", zIndex: 1 },
        }}
      >
        {img.map((image, i) => (
          <CardMedia
            component="img"
            height="150px"
            id={`image-${i}`}
            image={image}
            alt={`image-${i}`}
            sx={{ position: "relative" }}
          />
        ))}
      </Carousel>
      <CardActionArea
        LinkComponent={Link}
        to={`/product/${id}`}
        sx={{
          '& .MuiCardActionArea-focusHighlight': {
            backgroundColor: 'transparent',
          },
        }}
      >
        {/* <CardMedia
          component="img"
          height="150px"
          image={img[0]}
        />
        <Stack
          direction="row"
          position="absolute"
          top={5}
          left={5}
        >
          <Chip label="categoria" size="small" />
          <Chip label="categoria" size="small" />
          <Chip label="categoria" size="small" />
        </Stack> */}
        <CardContent sx={{ minHeight: "160px" }}>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Rating name="valoration" value={rating} readOnly precision={0.5} />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Tooltip title="Dinners numbers" placement="bottom-start">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              color={"secondary.main"}
            >
              <GroupsIcon fontSize="small" />
              <Typography variant="caption" fontFamily={"Roboto"}>
                {numberDiners}
              </Typography>
            </Stack>
          </Tooltip>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProductDisplay;
