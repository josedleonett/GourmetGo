import CardProductGridContainer from "../container/CardProductGridContainer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Hidden } from "@mui/material";
import SearchBannerContainer from "../container/SearchBannerContainer";



const ProductSearchDisplay = (listFiltered) => {
  const navigate = useNavigate();
  console.log(listFiltered)

  return (
    <>
    <SearchBannerContainer filterList={listFiltered.categorieList} filterBundle={listFiltered.bundleList}/>
      {listFiltered.listFiltered && listFiltered.listFiltered.length > 0 ? (
        <Box sx={{ padding: "1vw" }}>
          <CardProductGridContainer list={listFiltered.listFiltered} />
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
        <Box sx={{position: "absolute", right: "-5vw", height: "60%"}}
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
