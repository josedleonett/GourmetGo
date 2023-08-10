import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import CardContainer from "../container/CardContainer";
import CardProductGridContainer from "../container/CardProductGridContainer";
import Carousel from "react-material-ui-carousel";
import { categories, cateringPackages } from "../test/dataApiSample";
import CardProductContainer from "../container/CardProductContainer";
import CarouselCategoryContainer from "../container/CarouselCategoryContainer";
import SearchBannerContainer from "../container/SearchBannerContainer";

const HomeDisplay = ({ props }) => {
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
