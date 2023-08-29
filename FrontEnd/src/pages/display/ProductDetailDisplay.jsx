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
  Button,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { cateringPackages } from "../../test/dataApiSample";
import { useNavigate, useParams } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { Gallery } from "react-grid-gallery";
import Lightbox from "react-lightbox-component";
import CoverProductGalleryContainer from "../../components/container/CoverProductGalleryContainer";

const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: "45vw",
    height: "auto",
    isSelected: false,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    alt: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
  },
];

const ProductDetailDisplay = ({productData}) => {
  const packageList = cateringPackages;
  const { id } = useParams();
  const navigate = useNavigate();

  function findPackageById(array, idToFind) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == idToFind) {
        return i;
      }
    }
    return -1;
  }

  const goBackOnClick = () => {
    navigate("/");
  };

  const mainPackageId = findPackageById(packageList, id);

  const [currentImageIndex, setCurrentIndex] = useState(0);

  return (
    <Box sx={{ padding: 2 }}>      

      <IconButton aria-label="Back" onClick={goBackOnClick}>
        <ArrowBackIcon />
      </IconButton>

      <CoverProductGalleryContainer
        imgList={productData ? productData.galleryImages : []}
        galleryId={"productGallery"}
      />

      <Container>
        <Grid container padding={2} lg={12}>
          <Box>
            <Typography variant="h4">
              {productData ? productData.name : ""}
            </Typography>
            <Typography variant="subtitle1" fontStyle="italic" fon>
              {productData ? productData.description : ""}
            </Typography>
          </Box>
          <Divider light />

          <Grid item lg={8} md={7}>
            <Container>
              <Container>
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <BiDish size="30" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Main course:"
                        secondary={
                          <>
                            {productData ? (
                              productData.starter.map((starterItem, index) => (
                                <div key={index}>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {starterItem.name}
                                  </Typography>
                                  {` — ${starterItem.description}`}
                                </div>
                              ))
                            ) : (
                              ""
                            )}
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
                        primary="Main course:"
                        secondary={
                          <>
                            {productData ? (
                              productData.mainCourse.map((mainItem, index) => (
                                <div key={index}>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {mainItem.name}
                                  </Typography>
                                  {` — ${mainItem.description}`}
                                </div>
                              ))
                            ) : (
                              ""
                            )}
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
                            {productData ? (
                              productData.desserts.map((dessertsItem, index) => (
                                <div key={index}>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {dessertsItem.name}
                                  </Typography>
                                  {` — ${dessertsItem.description}`}
                                </div>
                              ))
                            ) : (
                              ""
                            )}
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
                            {productData ? (
                              productData.drinks.map((dessertsItem, index) => (
                                <div key={index}>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {dessertsItem.name}
                                  </Typography>
                                </div>
                              ))
                            ) : (
                              ""
                            )}
                          </>
                        }
                      />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </List>
              </Container>
            </Container>
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            <Paper elevation={6} sx={{ py: 4, px: 1 }}>
              <Container
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  color={"secondary.main"}
                >
                </Stack>
                <Button variant="contained" color="secondary">
                  RESERVE
                </Button>
              </Container>
            </Paper>
          </Grid>
        </Grid>
        <Box height={50}/>
      </Container>
    </Box>
  );
};

export default ProductDetailDisplay;
