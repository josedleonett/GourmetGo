import CardProductGridContainer from "../container/CardProductGridContainer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Hidden, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchBannerContainer from "../../components/container/SearchBannerContainer";

const ProductSearchDisplay = (filteredOptions, categorieList, bundleList) => {
  const navigate = useNavigate();
  const goBackOnClick = () => {
    navigate("/");
  };
  return (
    <Box>
      <SearchBannerContainer
        filterList={filteredOptions.categorieList}
        filterBundle={filteredOptions.bundleList}
      />
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
            marginTop: "30vh",
            height: "20vw" 
          }}
        >
          <Box
            sx={{
              position: "relative",
              bottom: "5vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Bundles not found</Typography>
            <Button onClick={() => navigate("/")}>Go home</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductSearchDisplay;
