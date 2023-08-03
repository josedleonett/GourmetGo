import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const HeaderDisplay = ({ props }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" variant="dense">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Mobile Menu */}
            <Drawer
              anchor="left"
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
            >
              <List>
                <ListItem button onClick={handleMobileMenuClose}>
                  <ListItemText primary="HOME" />
                </ListItem>
                <ListItem button onClick={handleMobileMenuClose}>
                  <ListItemText primary="ABOUT US" />
                </ListItem>
                <ListItem button onClick={handleMobileMenuClose}>
                  <ListItemText primary="CONTACT US" />
                </ListItem>
              </List>
            </Drawer>

            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="body1" color="initial">
              GOURMETGO
            </Typography>
            <Tabs
              variant="fullWidth"
              centered
              indicatorColor="secondary"
              textColor="secondary"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                "& .MuiTab-root": { padding: "0 50px" },
              }}
            >
              <Box>
                <Tab label="HOME" />
                <Tab label="ABOUT US" />
                <Tab label="CONTACT US" />
              </Box>
            </Tabs>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& > *": { marginLeft: "8px" },
              }}
            >
              <Button variant="contained" color="secondary">
                LOG IN
              </Button>
              <Button variant="contained" color="secondary">
                SIGN UP
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar/>
    </>
  );
};

export default HeaderDisplay;
