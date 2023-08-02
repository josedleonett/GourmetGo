import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/material";

const useStyle = makeStyles({
  header: {
    background: "green",
  },
});

const HeaderDisplay = ({ props }) => {
  const style = useStyle();

  return (
    <AppBar className={style.header} position="fixed" variant="dense">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography component="a" href="/" variant="h6">
            GOURMET GO
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: "auto" }}
          >
            LOG IN
          </Button>
          <Button variant="contained" color="secondary">
            SIGN UP
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderDisplay;
