import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, Icon } from "@mui/material";
import CardProductGridContainer from "../../components/container/CardProductGridContainer";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import CircularProgress from "@mui/material/CircularProgress";

const UserFavoriteContainer = ({ accessToken }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [idToDelete, setIdToDelete] = useState('')

  useEffect(() => {
    if (cookies.token) {
      const decoded = jwtDecode(cookies.token);
      setDecodedToken(decoded);
    }
  }, [cookies.token]);

  useEffect(() => {
    if (decodedToken) {
      fetch(`http://localhost:8080/v1/bundle/byUser/${decodedToken.id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Respuesta del servidor no exitosa");
          }
        })
        .then((data) => {
          const isFavoriteData = data.filter(
            (bundle) => bundle.favorite === true
          );
          setFavorites(isFavoriteData);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [decodedToken]);

  useEffect(() => {
    removeFromFavorites(idToDelete)
    setIdToDelete('')
  }, [idToDelete])
  
  const removeFromFavorites = (idToRemove) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== idToRemove)
    );
  };

  return (
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
          My favorites
        </Typography>
      </Box>
      {favorites.length >= 1 ? (
        <CardProductGridContainer list={favorites} setIdToDelete={setIdToDelete} />
      ) : isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Icon
            component={HeartBrokenIcon}
            color="primary"
            sx={{ fontSize: "4rem" }}
          />
          <Typography variant="body1">
            You don't have any favorites yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserFavoriteContainer;
