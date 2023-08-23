import { Box, Grid } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import CardCategoryContainer from "../container/CardCategoryContainer";

const CarouselCategoryDisplay = ({ elementsGroup }) => {

  const CardSkeleton = () => {
    return(
      <Stack spacing={1}>
      <Skeleton variant="rectangular" width={210} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
    )
  }
  
  return (
    <Box>
      <Carousel animation="fade" navButtonsAlwaysVisible={true}>
        {elementsGroup.map((group, i) => (
          <Grid container justifyContent="space-evenly" key={i}>
            {group.map((item, j) => (
              <Grid item lg={2} key={j}>
                <CardCategoryContainer
                  id={item.id}
                  img={item.image}
                  title={item.name}
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
