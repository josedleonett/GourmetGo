import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid, useTheme, useMediaQuery } from "@mui/material";
import CardContainer from "../../components/container/CardContainer";
import CardProductGridContainer from "../../components/container/CardProductGridContainer";
import Carousel from "react-material-ui-carousel";
import { categories, cateringPackages } from "../../test/dataApiSample";
import CardProductContainer from "../../components/container/CardProductContainer";
import CarouselCategoryContainer from "../../components/container/CarouselCategoryContainer";
import SearchBannerContainer from "../../components/container/SearchBannerContainer";

const HomeDisplay = ({ props }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 
  return (
    <>
      <SearchBannerContainer filterList={categories} />

      <Box component="section">
        <Typography
          variant="h4"
          backgroundColor="secondary.light"
          marginTop={3}
          marginBottom={2}
          paddingX={3}
          maxWidth="30vw"
          textAlign="right"
          sx={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }}
        >
          Categories
        </Typography>
        <Container maxWidth="100vw">
          <CarouselCategoryContainer elementsList={categories} />
        </Container>
      </Box>

      <Box component="section">
        <Typography
          variant="h4"
          backgroundColor="secondary.light"
          marginTop={3}
          marginBottom={2}
          paddingX={3}
          maxWidth="30vw"
          textAlign="right"
          sx={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }}
        >
          Packages
        </Typography>
        <Container component="section" maxWidth="100vw">
          <CardProductGridContainer list={cateringPackages} />
        </Container>
      </Box>
    </>
  );
};

export default HomeDisplay;
