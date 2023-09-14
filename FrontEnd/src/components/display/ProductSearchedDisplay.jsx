import CardProductGridContainer from "../container/CardProductGridContainer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Hidden, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductSearchDisplay = (filteredOptions) => {
  const navigate = useNavigate(); // Obtiene la función navigate
  const goBackOnClick = () => {
    navigate("/");
  };
  return (
    <>
      {filteredOptions.listFiltered &&
      filteredOptions.listFiltered.length > 0 ? (
        <Box sx={{ padding: "1vw" }}>
          <IconButton
            aria-label="Back"
            onClick={goBackOnClick}
            style={{ marginRight: "10px", marginBottom: "8px" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <CardProductGridContainer list={filteredOptions.listFiltered} />
        </Box>
      ) : (
        <Box
          sx={{
            padding: "1vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              padding: 1,
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Bundles not found</Typography>
            <Button onClick={() => navigate("/")}>Go home</Button>
          </Box>
          <Hidden mdDown>
            <Box
              sx={{ position: "absolute", right: "-5vw", height: "60%" }}
              component="img"
              alt="The house from the offer."
              src="images/confusing-chef.png"
            />
          </Hidden>
        </Box>
      )}
    </>
  );
};

export default ProductSearchDisplay;
