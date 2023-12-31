import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Tabs,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { companyLogo } from "../../utils/theme";
import UserFavoriteContainer from "../../pages/container/UserFavoriteContainer";

const HeaderDisplay = ({ accessToken }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserDrawerOpen, setUserDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [randomBackgroundColor, setRandomBackgroundColor] = useState(
    getRandomColor()
  );
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsSticky(scrollY >= headerHeight);
  };

  const headerHeight = 500;

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    window.location.href = "/";
  };

  let decodedToken = null;

  if (accessToken !== undefined && cookies.token) {
    decodedToken = jwtDecode(cookies.token);
  }

  const initials =
    decodedToken && decodedToken.name && decodedToken.lastName
      ? decodedToken.name.charAt(0) + decodedToken.lastName.charAt(0)
      : "";
  const userFullName =
    decodedToken && decodedToken.name && decodedToken.lastName
      ? `${decodedToken.name} ${decodedToken.lastName}`
      : "";
  const userEmail =
    decodedToken && decodedToken.email ? decodedToken.email : "";

  const handleFavoritesClick = () => {
    if (isFavoritesOpen) {
      window.location.href = "/";
    } else {
      setFavoritesOpen(true);
    }
  };

  function getRandomColor() {
    const minBrightness = 50;
    const maxBrightness = 200;
    const minColorValue = 100;
    const maxColorValue = 200;
    const randomColorComponent = () =>
      minColorValue +
      Math.floor(Math.random() * (maxColorValue - minColorValue + 1));
    let color = `rgb(${randomColorComponent()}, ${randomColorComponent()}, ${randomColorComponent()})`;
    const brightness = getBrightness(color);
    if (brightness < minBrightness || brightness > maxBrightness) {
      return getRandomColor();
    }
    return color;
  }

  function getBrightness(color) {
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  useEffect(() => {
    const storedColor = localStorage.getItem("userAvatarColor");
    if (!storedColor) {
      const newColor = getRandomColor();
      setRandomBackgroundColor(newColor);
      localStorage.setItem("userAvatarColor", newColor);
    } else {
      setRandomBackgroundColor(storedColor);
    }
  }, []);

  return (
    <>
      <AppBar
        position={isSticky ? "fixed" : "static"}
        variant="dense"
        sx={{ backgroundColor: "#AFC2C9" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Drawer
              anchor="left"
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
            >
              <List>
                {accessToken !== undefined ? (
                  <>
                    <ListItem button onClick={handleMobileMenuClose}>
                      <ListItemText primary="LOG OUT" onClick={handleLogout} />
                    </ListItem>
                    <ListItem button onClick={handleMobileMenuClose}>
                      <Avatar
                        sx={{ backgroundColor: randomBackgroundColor }}
                        onClick={() => setUserDrawerOpen(true)}
                      >
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
                        sx={{
                          color: "black",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
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
              <Box
                component="img"
                src={companyLogo.grayColor}
                alt="GourmetGo-logo"
                maxHeight={"50px"}
              />
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
            ></Tabs>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "0.5vw",
                marginLeft: "auto",
              }}
            >
              {accessToken !== undefined ? (
                <>
                  <Button component={Link} to="/">
                    HOME
                  </Button>
                  {decodedToken && decodedToken.role === "ADMIN" && (
                    <Button
                      component={Link}
                      to="/admin/bundles"
                      variant="contained"
                      sx={{
                        "&:hover": { backgroundColor: "blue" },
                        transition: "background-color 0.3s",
                      }}
                    >
                      Administration Panel
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      "&:hover": { backgroundColor: "red" },
                      transition: "background-color 0.3s",
                    }}
                  >
                    LOG OUT
                  </Button>
                  <Avatar
                    onClick={() => setUserDrawerOpen(true)}
                    sx={{
                      backgroundColor: randomBackgroundColor,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "transform 0.3s",
                      },
                    }}
                  >
                    {initials}
                  </Avatar>
                </>
              ) : (
                <>
                  <Button component={Link} to="/">
                    HOME
                  </Button>
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
      <Drawer
        anchor="right"
        open={isUserDrawerOpen}
        onClose={() => setUserDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 300,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ backgroundColor: randomBackgroundColor }}
            onClick={() => setUserDrawerOpen(true)}
          >
            {initials}
          </Avatar>
          <Typography>
            <h3>{userFullName}</h3>
          </Typography>
          <Typography>
            <h4>{userEmail}</h4>
          </Typography>
          <Typography
            component={Link}
            to="/favorites"
            onClick={() => setUserDrawerOpen(false)}
            sx={{
              color: "black",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Favorites
          </Typography>
          <Typography
            component={Link}
            to="/reservations"
            onClick={() => setUserDrawerOpen(false)}
            sx={{
              color: "black",
              cursor: "pointer",
              textDecoration: "none",
              margin: "20px 0",
            }}
          >
            Reservations
          </Typography>
          <Typography
            sx={{ color: "red", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Log out
          </Typography>
          {(accessToken === null || accessToken === undefined) && (
            <>
              <Typography
                component={Link}
                to="/user-login"
                variant="body1"
                sx={{ color: "black", cursor: "pointer" }}
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

      {isFavoritesOpen && <UserFavoriteContainer accessToken={accessToken} />}
    </>
  );
};

export default HeaderDisplay;
