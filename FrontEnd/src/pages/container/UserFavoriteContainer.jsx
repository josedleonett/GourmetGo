import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CardProductDisplay from "../../components/display/CardProductDisplay";

const UserFavoriteContainer = ({ decodedToken, bundleId }) => {
  const [favorites, setFavorites] = useState([]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    if (decodedToken) {
      const url = `http://localhost:8080/v1/user/${decodedToken.id}/favorites/${bundleId}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setFavorites(data);
        })
        .catch((error) => {
          console.error("Error al obtener los favoritos:", error);
        });
    }
  }, [decodedToken, bundleId]);

  console.log("Favorites:", favorites);

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
      <ul>
        {favorites.map((favorite) => {
          console.log("Favorite data:", favorite);
          return (
            <li key={favorite.id}>
              <CardProductDisplay
                id={favorite.id}
                img={favorite.img}
                title={favorite.title}
                description={favorite.description}
                categoryList={favorite.categoryList}
                rating={favorite.rating}
                numberDiners={favorite.numberDiners}
                favorite={favorite.favorite}
              />
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

UserFavoriteContainer.propTypes = {
  decodedToken: PropTypes.object.isRequired,
  bundleId: PropTypes.string.isRequired,
};

export default UserFavoriteContainer;
