import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import "./HeaderDisplay.css"
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

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
  Hidden
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { companyLogo } from "../utils/theme";


const HeaderDisplay = ({ props }) => {
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

  // Altura del header para cambiar a posición fixed
  const headerHeight = 500;

  useEffect(() => {
    // Agrega un listener al evento 'scroll' del window
    window.addEventListener("scroll", handleScroll);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar position={isSticky ? "fixed" : "static"} variant="dense" sx={{backgroundColor: "#AFC2C9"}}>
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
            {/* <Typography variant="body1" color="initial">
              GOURMETGO
            </Typography> */}
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
              <Box>
                <Tab label="Bundles" sx={{fontSize: "0.9vw", padding: 0, minWidth: "7vw", fontWeight: "bold", color: "#222222", textTransform: "none"}}/>
                <Tab label="About us" sx={{fontSize: "0.9vw", padding: 0, minWidth: "7vw", fontWeight: "bold", color: "#222222", textTransform: "none"}}/>
                <Tab label="Contact" sx={{fontSize: "0.9vw", padding: 0, minWidth: "7vw", fontWeight: "bold", color: "#222222", textTransform: "none"}}/>
              </Box>
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: "0.5vw",
                "& > *": { marginLeft: "8px" },
              }}
            >
              <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{
                    padding: "0.8vw 3vw 0.8vw 3vw",
                    backgroundColor: "#222222",
                    borderRadius: 0,
                    fontWeight: "bold",
                    fontSize: "1vw"
    }}>
                LOG IN
              </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{
                    padding: "0.8vw 3vw 0.8vw 3vw",
                    backgroundColor: "#FFFFFF",
                    color: "#222222",
                    borderRadius: 0,
                    fontWeight: "bold",
                    fontSize: "1vw"
              }}>
                SIGN UP
              </Button>
              </Link>
            </Box>
            </Tabs>
            
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Hidden mdDown>
      <Box marginTop={`${headerHeight / 200000}px`}
  style={{
    transition: "margin 0.3s ease-out", // Añade una transición suave cuando cambia la posición
  }}>
        <div className="image-container">
          <div className="circle">
            <h2>
               Give more flavor to your party with us
            </h2>
            <p className="circle-description">
            Choose our service to bring the best dishes to your events
            </p>
            <Button variant="contained" sx={{
              position: "absolute",
              fontFamily: 'Josefin Sans, sans-serif',
              backgroundColor: "#333333",
              color: "#FFFFFF",
              fontSize: "0.9vw",
              left: "10vw",
              top: "23vw"
            }}>
              View all bundles
            </Button>
          </div>
          
          <img src="/images/cateringdishes 1.png" alt="dishes" className="img-dishes" />
        </div>
      </Box>
      </Hidden> */}
    </>
  );
};

export default HeaderDisplay;
