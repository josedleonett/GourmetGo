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
import React, { useState } from "react";
import { cateringPackages } from "../test/dataApiSample";
import { useNavigate, useParams } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { Gallery } from "react-grid-gallery";
import Lightbox from "react-lightbox-component";

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

const ProductDetailDisplay = () => {
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
      {/* <Gallery images={images}/> */}

      {/* <Lightbox
        images={images}
        thumbnailWidth="200px" // Establece el ancho de las miniaturas
        showImageModifiers={false} // Desactiva los botones de navegación
        currentIndex={currentImageIndex} // Índice de la imagen inicial
      /> */}

      <IconButton aria-label="Back" onClick={goBackOnClick}>
        <ArrowBackIcon />
      </IconButton>

      <Container >
        <Grid container justifyContent="space-evenly" width="100%" >
          <Grid
            item
            lg={packageList[mainPackageId].galleryImages.length > 1 ? 6 : 12}
            md={packageList[mainPackageId].galleryImages.length > 1 ? 6 : 12}
            sx={
              packageList[mainPackageId].galleryImages.length === 1
                ? { md: { width: "100%", objectFit: "cover" } }
                : { pr: 1 }
            }
            mb={1}
          >
            <Box
              component="img"
              src={packageList[mainPackageId].galleryImages[0]}
              alt="Image 1"
              width="100%"
              height="100%"
              sx={{ 
                objectFit: "cover",
                objectPosition: "center center"
              }}
            />
          </Grid>

          {packageList[mainPackageId].galleryImages.length > 1 && (
            <Grid
              container
              justifyContent="space-evenly"
              spacing={1}
              lg={6}
              md={6}
              mb={1}
            >
              {packageList[mainPackageId].galleryImages
                .slice(1)
                .map((image, i) => (
                  <Grid
                    item
                    key={i}
                    xs={3}
                    lg={6}
                    md={6}
                    flexDirection={"column"}
                  >
                    <Box
                      component="img"
                      src={`${image}?&fit=crop&auto=format`}
                      alt={`Image ${i + 2}`}
                      width="100%"
                      height="100%"
                      sx={{
                        objectFit: "cover",
                        objectPosition: "center center",
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Grid>

        <Divider sx={{ pt: 2 }} />
      </Container>

      <Container>
        <Grid container padding={2} lg={12}>
          <Grid item lg={8} md={7}>
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

          <Grid item lg={4} md={5} xs={12}>
            <Paper elevation={8} sx={{ padding: 2 }}>
              <Container
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
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
                  <GroupsIcon fontSize="small" color="primary" />
                  <Typography variant="caption" color="primary">
                    {packageList[mainPackageId].numberDiners}
                  </Typography>
                </Stack>
                <Button variant="contained" color="primary">
                  RESERVE
                </Button>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailDisplay;
