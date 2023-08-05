import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const CardProductDisplay = ({ img, title, description }) => {
  return (
    <Card raised>
      <CardActionArea>
        <CardMedia
          component="img"
          height="40%"
          image={img}
          alt="green iguana"
        />
        <CardContent sx={{ height: "60%" }}>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardProductDisplay;
