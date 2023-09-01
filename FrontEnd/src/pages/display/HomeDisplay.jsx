import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, useTheme, useMediaQuery } from "@mui/material";
import CardProductGridContainer from "../../components/container/CardProductGridContainer";
import CarouselCategoryContainer from "../../components/container/CarouselCategoryContainer";
import SearchBannerContainer from "../../components/container/SearchBannerContainer";

const HomeDisplay = ({ categories, bundles, categorieList, bundleList }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 
  

  return (
    <>
      <SearchBannerContainer filterList={categorieList} filterBundle={bundleList}/>
      
      <Box component="section">
        <Typography
          variant="h4"
          backgroundColor="secondary.light"
          marginTop={3}
          marginBottom={2}
          paddingX={3}
          maxWidth="30vw"
          textAlign="right"
          sx={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }}
        >
          Categories
        </Typography>
        <Container maxWidth="100vw">
          <CarouselCategoryContainer elementsList={categories} />
        </Container>
      </Box>

      <Box component="section">
        <Typography
          variant="h4"
          backgroundColor="secondary.light"
          marginTop={3}
          marginBottom={2}
          paddingX={3}
          maxWidth="30vw"
          textAlign="right"
          sx={{ fontSize: isSmallScreen ? "1.5rem" : "2rem" }}
        >
          Packages
        </Typography>
        <Container component="section" maxWidth="100vw">
          <CardProductGridContainer list={bundles} />
        </Container>
      </Box>
    </>
  );
};

export default HomeDisplay;
