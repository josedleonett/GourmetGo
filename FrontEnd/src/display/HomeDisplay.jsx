import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CardContainer from "../container/CardContainer";

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
        top: "10vw"
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
            }}>
              Categories
            </Typography>
        </Paper>
      </div>
      <Grid item container sx={{width: "100%", position: "relative", top: "1vw", justifyContent: "space-evenly", gap: "1vw" }}>
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
