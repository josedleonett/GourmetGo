import { Box, Grid } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import CardCategoryContainer from "../container/CardCategoryContainer";

const CarouselCategoryDisplay = ({ elementsGroup }) => {
  return (
    <Box>
      <Carousel animation="slide" navButtonsAlwaysVisible={true}>
        {elementsGroup.map((group, i) => (
          <Grid container justifyContent={"space-evenly"} key={i}>
            {group.map((item, j) => (
              <Grid item lg={2} key={j}>
                <CardCategoryContainer
                  id={item.id}
                  img={item.img}
                  title={item.title}
                  description={item.description}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselCategoryDisplay;
