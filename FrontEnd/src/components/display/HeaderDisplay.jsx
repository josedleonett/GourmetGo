import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab, IconButton, Drawer, List, ListItem, ListItemText, Avatar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { companyLogo } from "../../utils/theme";

const HeaderDisplay = ({ hasAccessToken }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserDrawerOpen, setUserDrawerOpen] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("tokenType");
    window.location.reload();
  };

  const initials = localStorage.getItem("name")?.charAt(0) + localStorage.getItem("lastName")?.charAt(0);
  const userFullName = `${localStorage.getItem("name")} ${localStorage.getItem("lastName")}`;
  const userEmail = localStorage.getItem("email");

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
                {hasAccessToken ? (
                  <>
                    <ListItem button onClick={handleMobileMenuClose}>
                      <ListItemText primary="LOG OUT" onClick={handleLogout} />
                    </ListItem>
                    <ListItem button onClick={handleMobileMenuClose}>
                      <Avatar sx={{ backgroundColor: "green" }} onClick={() => setUserDrawerOpen(true)}>
                        {initials}
                      </Avatar>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem button onClick={handleMobileMenuClose}>
                      <Typography
                        component={Link}
                        to="/user-login"
                        variant="body1"
                        sx={{ color: "black", cursor: "pointer", textDecoration: "none"  }}
                      >
                        LOG IN
                      </Typography>
                    </ListItem>
                    <ListItem button onClick={handleMobileMenuClose}>
                      <Typography
                        component={Link}
                        to="/user-register"
                        variant="body1"
                        sx={{
                          color: "black",
                          cursor: "pointer",
                          marginBottom: "1rem",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          borderBottom: "none",
                        }}
                      >
                        Sign Up
                      </Typography>
                    </ListItem>
                  </>
                )}
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
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "0.5vw",
                marginLeft: "auto",
              }}
            >
              {hasAccessToken ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{ "&:hover": { backgroundColor: "red" }, transition: "background-color 0.3s" }}
                  >
                    LOG OUT
                  </Button>
                  <Avatar
                    onClick={() => setUserDrawerOpen(true)}
                    sx={{
                      backgroundColor: "green",
                      cursor: "pointer",
                      "&:hover": { transform: "scale(1.1)", transition: "transform 0.3s" },
                    }}
                  >
                    {initials}
                  </Avatar>
                </>
              ) : (
                <>
                  <Button component={Link} to="/user-login" variant="contained">
                    LOG IN
                  </Button>
                  <Button
                    component={Link}
                    to="/user-register"
                    variant="contained"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    SIGN UP
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={isUserDrawerOpen} onClose={() => setUserDrawerOpen(false)}>
        <Box
          sx={{
            width: 300,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar onClick={() => setUserDrawerOpen(true)} sx={{ backgroundColor: "green" }}>
            {initials}
          </Avatar>
          <Typography><h3>{userFullName}</h3></Typography>
          <Typography><h4>{userEmail}</h4></Typography>
          <Typography><p>Favourites</p></Typography>
          <Typography><p>Reservations</p></Typography>
          <Typography sx={{ color: "red", cursor: "pointer" }} onClick={handleLogout}>
            Log out
          </Typography>
          {!hasAccessToken && (
            <>
              <Typography
                component={Link}
                to="/user-login"
                variant="body1"
                sx={{ color: "black", cursor: "pointer", }}
                onClick={handleMobileMenuClose}
              >
                LOG IN
              </Typography>
              <Typography
                component={Link}
                to="/user-register"
                variant="body1"
                sx={{
                  color: "black",
                  cursor: "pointer",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "none",
                }}
                onClick={handleMobileMenuClose}
              >
                SIGN UP
              </Typography>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderDisplay;
