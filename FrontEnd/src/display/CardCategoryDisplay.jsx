import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";

const CardCategoryDisplay = ({ img, title, description }) => {
  return (
    <>
      <Card>
        <CardActionArea>
          <Box
            sx={{ display: "flex", flexDirection: { lg: "column", md: "row", xs:"column" } }}
          >
            <CardMedia
              component="img"
              height="240px"
              image={img}
              alt={title + " cover"}
            />
            <CardContent sx={{ minHeight: 153 }}>
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardCategoryDisplay;
