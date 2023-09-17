import { useState, useEffect } from "react";
import { Box, Grid, CircularProgress} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import CardCategoryContainer from "../container/CardCategoryContainer";

const CarouselCategoryDisplay = ({ elementsGroup }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
      )}
    </>
  );
};
export default CarouselCategoryDisplay;
