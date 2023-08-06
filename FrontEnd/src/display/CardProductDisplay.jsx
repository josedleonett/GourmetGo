import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip, Rating, Stack, Tooltip } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from 'react-router-dom';

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
      <CardActionArea
        LinkComponent={Link} to={`/product/${id}`}
      >
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
