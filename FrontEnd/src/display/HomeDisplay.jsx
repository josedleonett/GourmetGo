import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid } from '@mui/material';
import CardContainer from "../container/CardContainer";

const HomeDisplay = ({ props }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        position: "absolute",
        left: 0,
      }}
    >
      <div style={{ width: "100vw", height: "3.5vw" }}>
        <Paper
          variant="outlined"
          sx={{
            height: "3.5vw",
            width: "43vw",
            position: "absolute",
            backgroundColor: "#E2D6D6",
          }}
        >
          <Box
            sx={{
              position: "relative",
              left: "9vw",
              fontFamily: "Roboto, sans-serif",
              bottom: "3vw",
              fontWeight: 700,
              fontSize: "2.7vw",
            }}
          >
            <p>Categories</p>
          </Box>
        </Paper>
      </div>
      <Grid item container sx={{width: "100vw", position: "relative", top: "1vw", justifyContent: "space-evenly", gap: "1vw" }}>
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </Grid>
    </section>
  );
};

export default HomeDisplay;
