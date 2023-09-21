import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  CircularProgress,
  Pagination,
  Grid,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

const ReservationItem = ({ reservation, itemSize }) => {
  const reservationItemStyle = {
    margin: "0px 10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "130px",
    width: "250px",
    paddingTop: "10px",
    textAlign: "center",
  };

  const typographyStyle = {
    marginBottom: "12px",
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={itemSize}>
      <div style={reservationItemStyle}>
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", textAlign: "center", marginTop: "px" }}
          sx={{ backgroundColor: "secondary.light" }}
        >
          Reservation number: {reservation.id}
        </Typography>
        <Typography variant="body1" style={typographyStyle}>
          Bundle: {reservation.bundleName}
        </Typography>
        <Typography variant="body1" style={typographyStyle}>
          Date: {reservation.date}
        </Typography>
        <Typography variant="body1" style={typographyStyle}>
          Price: ${reservation.price} USD
        </Typography>
      </div>
    </Grid>
  );
};

const UserReservationContainer = ({ accessToken }) => {
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const containerRef = useRef(null);

  useEffect(() => {
    if (cookies.token) {
      const decoded = jwtDecode(cookies.token);
      setDecodedToken(decoded);
    }
  }, [cookies.token]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (decodedToken) {
        try {
          const response = await fetch(
            `http://localhost:8080/v1/booking/byUser/${decodedToken.id}`
          );
          if (!response.ok) {
            throw new Error("Respuesta del servidor no exitosa");
          }
          const data = await response.json();
          setReservations(data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      }
    };
    fetchReservations();
  }, [decodedToken]);

  let itemSize = 2;

  if (!isSmallScreen) {
    itemSize = 2;
  } else if (isSmallScreen && !isLoading) {
    itemSize = 4;
  }

  const itemsPerPage = 12;
  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = reservations.slice(startIndex, endIndex);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box sx={{ padding: "2vw", textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "3rem",
                fontSize: isSmallScreen ? "1.5rem" : "2rem",
                backgroundColor: "secondary.light",
                display: "inline-block",
                fontWeight: 500,
                padding: "0.5rem",
                paddingTop: "1rem",
              }}
            >
              My reservations
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {currentReservations.map((reservation) => (
              <ReservationItem
                key={reservation.id}
                reservation={reservation}
                itemSize={itemSize}
              />
            ))}
          </Grid>
          <Box
            padding={5}
            display="flex"
            alignContent="center"
            justifyContent="center"
            ref={containerRef}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserReservationContainer;