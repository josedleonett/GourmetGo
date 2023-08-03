import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

const HeaderDisplay = ({ props }) => {
  return (
    <AppBar position="fixed" variant="dense" color="secondary">
      <Toolbar sx={{ margin: 5 }}>
        <Typography component="a" href="/" variant="h6">
          GOURMET GO
        </Typography>
        <Button variant="contained" color="primary">
          LOG IN
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "chocolate",
          }}
        >
          nuevo boton
        </Button>
        <Button variant="contained" color="secondary">
          SIGN UP
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderDisplay;
