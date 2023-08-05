import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip, Stack } from "@mui/material";

const CardProductDisplay = ({ img, title, description, categoryList }) => {
  return (
    <Card raised>
      <CardActionArea>
        <CardMedia
          component="img"
          height="40%"
          image={img}
          alt="green iguana"
        />
        <Stack
          direction="row"
          position="absolute" // Para posicionar los chips sobre la imagen
          top={5} // Ajusta esta posición según tu preferencia
          left={5} // Ajusta esta posición según tu preferencia
        >
          <Chip label="categoria" size="small" />
          <Chip label="categoria" size="small" />
          <Chip label="categoria" size="small" />
        </Stack>
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
