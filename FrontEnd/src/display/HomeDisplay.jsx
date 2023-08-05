import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import CardContainer from "../container/CardContainer";
import CardGridContainer from "../container/CardGridContainer";
import Carousel from "react-material-ui-carousel";
import { categories } from "../test/dataApiSample";
import CardProductContainer from "../container/CardProductContainer";
import CarouselCategoryContainer from "../container/CarouselCategoryContainer";
import SearchBannerContainer from "../container/SearchBannerContainer";

const HomeDisplay = ({ props }) => {
  return (
    <>
      <SearchBannerContainer filterList={categories} />
      <Container maxWidth="100vw">
        <CarouselCategoryContainer elementsList={categories} />
      </Container>
      {/* <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "relative",
          left: "0vw",
          float: "left",
          top: "10vw",
        }}
      >
        <div style={{ width: "100%", height: "3.5vw" }}>
          <Paper
            variant="outlined"
            sx={{
              height: "3.5vw",
              width: "43vw",
              position: "absolute",
              backgroundColor: "#E2D6D6",
            }}
          >
            <Typography
              sx={{
                position: "relative",
                left: "9vw",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "2.4vw",
              }}
            >
              Categories
            </Typography>
          </Paper>
        </div>
      </section> */}
    </>
  );
};

export default HomeDisplay;
