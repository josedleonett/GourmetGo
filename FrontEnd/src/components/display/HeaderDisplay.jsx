import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab, IconButton, Drawer, List, ListItem, ListItemText, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { companyLogo } from "../../utils/theme";

const HeaderDisplay = ({ hasAccessToken }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsSticky(scrollY >= headerHeight);
  };

  const headerHeight = 500;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar position={isSticky ? "fixed" : "static"} variant="dense" sx={{ backgroundColor: "#AFC2C9" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Drawer anchor="left" open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
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

            <Link to="/">
              <Box component="img" src={companyLogo.grayColor} alt="GourmetGo-logo" maxHeight={"50px"} />
            </Link>

            <Tabs
              variant="fullWidth"
              centered
              indicatorColor="secondary"
              textColor="secondary"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                justifyContent: "space-evenly",
              }}
            >
              {/* ... Código de las Tabs ... */}
            </Tabs>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "0.5vw",
                "& > *": { marginLeft: "8px" },
              }}
            >
              {hasAccessToken ? (
                <>
                  <Button variant="contained">
                    LOG OUT
                  </Button>
                  <Avatar />
                </>
              ) : (
                <>
                  <Button component={Link} to="/user-login" variant="contained">
                    LOG IN
                  </Button>
                  <Button component={Link} to="/user-register" variant="contained">
                    SIGN UP
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default HeaderDisplay;
