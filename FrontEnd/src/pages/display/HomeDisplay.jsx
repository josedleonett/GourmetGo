import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
<<<<<<< HEAD
import { Container, useTheme, useMediaQuery, Stack, Skeleton } from "@mui/material";
=======
import {
  Container,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
>>>>>>> 0dc08e9bcfcfbcdd9362891939e46b07644b3333
import CardProductGridContainer from "../../components/container/CardProductGridContainer";
import CarouselCategoryContainer from "../../components/container/CarouselCategoryContainer";
import SearchBannerContainer from "../../components/container/SearchBannerContainer";

const HomeDisplay = ({ categories, bundles, categorieList, bundleList }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 

  const CardSkeleton = () => {
    return(
      <Stack spacing={1}>
      <Skeleton variant="rectangular" width={210} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
    )
  }

  return (
    <>
<<<<<<< HEAD
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
        {categories && categories.length > 0 ? (
            <CarouselCategoryContainer elementsList={categories} />
          ) : (
            <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
              {Array.from({ length: 5 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </Box>
          )}
          </Container>
      </Box>
=======
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
        <>
          <SearchBannerContainer
            filterList={categorieList}
            filterBundle={bundleList}
          />
>>>>>>> 0dc08e9bcfcfbcdd9362891939e46b07644b3333

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
