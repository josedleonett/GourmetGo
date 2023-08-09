import { MdLocalBar } from "react-icons/md";
import { GiPieSlice } from "react-icons/gi";
import { RiRestaurant2Line } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { cateringPackages } from "../test/dataApiSample";
import { useParams } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import ListItemAvatar from "@mui/material/ListItemAvatar";


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

  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

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

      <Grid container lg={12}>
        <Grid item lg={8}>
          <Container>
            <Box>
              <Typography variant="h4">
                {packageList[mainPackageId].name}
              </Typography>
              <Typography variant="subtitle1" fontStyle="italic" fon>
                {packageList[mainPackageId].description}
              </Typography>
            </Box>

            <Divider light />

            <Container>
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <BiDish size="30" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Starter:"
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {packageList[mainPackageId].starter.name}
                        </Typography>
                        {` — ${packageList[mainPackageId].starter.description}`}
                      </>
                    }
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <RiRestaurant2Line size="30" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Main Course:"
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {packageList[mainPackageId].mainCourse.name}
                        </Typography>
                        {` — ${packageList[mainPackageId].mainCourse.description}`}
                      </>
                    }
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <GiPieSlice size="30" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Dessert:"
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {packageList[mainPackageId].dessert.name}
                        </Typography>
                        {` — ${packageList[mainPackageId].dessert.description}`}
                      </>
                    }
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <MdLocalBar size="30" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Drinks:"
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {packageList[mainPackageId].drinks
                            .map((drink) => drink.name)
                            .join(", ")}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>

                <Divider variant="inset" component="li" />
              </List>
            </Container>
          </Container>
        </Grid>

        <Grid item lg={4}>
          <Paper sx={{ display: "flex" }}>
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
              <Typography variant="caption">
                {packageList[mainPackageId].numberDiners}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailDisplay;
