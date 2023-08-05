import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const CardCategoryDisplay = ({ img, title, description }) => {
  return (
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="240px"
          image={img}
          alt="green iguana"
        />
        <CardContent sx={{minHeight:153}}>
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

export default CardCategoryDisplay;
