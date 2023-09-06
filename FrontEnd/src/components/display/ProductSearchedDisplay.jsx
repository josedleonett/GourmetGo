import ProductSearchedDisplay from "../display/ProductSearchedDisplay";
import CardProductGridContainer from "../container/CardProductGridContainer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Hidden } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";



const ProductSearchDisplay = (filteredOptions) => {
  const navigate = useNavigate(); // Obtiene la función navigate

  return (
    <>
      {filteredOptions.listFiltered && filteredOptions.listFiltered.length > 0 ? (
        <Box sx={{ padding: "1vw" }}>
          <CardProductGridContainer list={filteredOptions.listFiltered} />
        </Box>
      ) : (
        <Box
        sx={{
          padding: "1vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Hidden mdDown>
        <Box
      ></Box>
        </Hidden>
        <Box
          sx={{
            padding: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: { xs: 14, sm: 40, md: 60 }, // Controla el margen izquierdo de manera responsive
          }}
        >
          <Typography variant="h6">Bundles not found</Typography>
          <Button onClick={() => navigate("/")}>Go home</Button>
        </Box>
        <Hidden mdDown>
        <Box
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
