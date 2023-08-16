import React, { Children } from "react";
import Grid from "@mui/material/Grid";

const CardGridDisplay = ({ children }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid>{children}</Grid>
        <Grid>{children}</Grid>
      </Grid>
    </>
  );
};

export default CardGridDisplay;
