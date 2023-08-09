import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { cateringPackages } from "../test/dataApiSample";
import { useParams } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import CardCategoryContainer from "../container/CardCategoryContainer";

const ProductDetailDisplay = () => {
  const packageList = cateringPackages;
  const { id } = useParams();

  function findPackageById(array, idToFind) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == idToFind) {
        return i;
      }
    }
    return -1;
  }

  const mainPackageId = findPackageById(packageList, id);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container justifyContent="space-evenly">
        <Grid item pr={1} lg={6} md={6}>
          <Box
            component="img"
            src={packageList[mainPackageId].galleryImages[0]}
            alt="Image 1"
            width="100%"
          ></Box>
        </Grid>

        <Grid
          container
          item
          justifyContent="space-evenly"
          spacing={1}
          lg={6}
          md={6}
        >
          {packageList[mainPackageId].galleryImages.slice(1).map((image, i) => (
            <Grid item key={i} xs={3} lg={6} md={6}>
              <Box
                component="img"
                src={`${image}?&fit=crop&auto=format`}
                alt={`Image ${i + 2}`}
                width="100%"
              ></Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Container>
        <Typography variant="h2">{packageList[mainPackageId].name}</Typography>
        <Rating
          name="valoration"
          value={packageList[mainPackageId].rating}
          readOnly
          precision={0.5}
        />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          color={"secondary.main"}
        >
          <GroupsIcon fontSize="small" />
          <Typography variant="caption" fontFamily={"Roboto"}>
            {packageList[mainPackageId].numberDiners}
          </Typography>
        </Stack>
      </Container>

      <Box>
        <Typography variant="h3">
          {packageList[mainPackageId].description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetailDisplay;
