import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CardContainer from "../container/CardContainer";
import CardGridContainer from "../container/CardGridContainer";
import Carousel from "react-material-ui-carousel";
import { categories } from "../test/dataApiSample";
import CardProductContainer from "../container/CardProductContainer";
import CarouselCategoryContainer from "../container/CarouselCategoryContainer";

const HomeDisplay = ({ props }) => {
  return (
    <section
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

      {/* <Carousel animation="slide" navButtonsAlwaysVisible="true">
        {categories.map((item, i) => (
          <Grid container spacing={1}>
            <Grid xs={3}>
              <CardProductContainer
                key={i}
                img={item.img}
                title={item.title}
                description={item.description}
              />
            </Grid>
            <Grid xs={3}>
              <CardProductContainer
                key={i}
                img={item.img}
                title={item.title}
                description={item.description}
              />
            </Grid>
            <Grid xs={3}>
              <CardProductContainer
                key={i}
                img={item.img}
                title={item.title}
                description={item.description}
              />
            </Grid>
            <Grid xs={3}>
              <CardProductContainer
                key={i}
                img={item.img}
                title={item.title}
                description={item.description}
              />
            </Grid>
          </Grid>
        ))}
      </Carousel> */}

      <CarouselCategoryContainer elementsList={categories} />

      {/* <Carousel animation="slide">
        {categories.map((item, i) => (
          <CardGridContainer list={categories} cardType="product" />
        ))}
      </Carousel>

      <CardGridContainer list={categories} cardType="product" /> */}

      {/* <Grid item container sx={{width: "100%", position: "relative", top: "1vw", justifyContent: "space-evenly", gap: "1vw" }}>
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </Grid> */}
    </section>
  );
};

export default HomeDisplay;
