import { useState, useEffect } from "react";
import { MdLocalBar } from "react-icons/md";
import { GiPieSlice } from "react-icons/gi";
import { RiRestaurant2Line } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  Stack,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";

import { cateringPackages } from "../../test/dataApiSample";
import { useNavigate, useParams } from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import CoverProductGalleryContainer from "../../components/container/CoverProductGalleryContainer";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from '@mui/material/Rating';
import { useCookies } from "react-cookie";

const ProductDetailDisplay = ({ productData, dates }) => {
  const packageList = cateringPackages;
  const { id } = useParams();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [userHasRating, setUserHasRating] = useState(false);
  const [totalRatings, setTotalRatings] = useState(0);
  const [hover, setHover] = useState(-1);
  const [showWarning, setShowWarning] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  let decodedToken = null;

  if (accessToken !== undefined && cookies.token) {
    decodedToken = jwtDecode(cookies.token);
  }

  console.log(userRating)
  console.log(averageRating)

  const handleNotLoggedClick = () => {
    if (cookies.token && cookies.token !== "") {
      if (decodedToken) {
        setIsUserLoggedIn(true);
      } else {
        setShowWarning(true);
      }
    } else {
      setShowWarning(true);
    }
  };

  useEffect(() => {
    if (productData && typeof productData.ratings === 'number') {
      const initialAverageRating = productData.ratings || 0;
      setAverageRating(initialAverageRating);
    }
  }, [productData]);

  const handleRatingChange = (newValue) => {
    setUserRating(newValue);
    setUserHasRating(true);
  
    const newTotalRatings = userRating !== null ? totalRatings : totalRatings + 1;
    const newAverageRating = (averageRating * totalRatings + newValue) / newTotalRatings;
  
    setTotalRatings(newTotalRatings);
    setAverageRating(newAverageRating);
  };

  const openReserveDialog = () => {
    setOpenDialog(true);
  };

  const closeReserveDialog = () => {
    setOpenDialog(false);
  };

  const goBackOnClick = () => {
    navigate("/");
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSendDate = () => {
    if (selectedDate) {
      console.log("Selected Date:", selectedDate.toISOString());
    }
  };

  const handleDateAccept = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    console.log(formattedDate);
  };

  const isDateUnavailable = (date) => {
    if (!dates) {
      return false;
    }

    const formattedDate = date.format("YYYY-MM-DD");
    const unavailableDates = dates.map((item) => item.date);

    return unavailableDates.includes(formattedDate);
  };
  const shareUrl = `http://127.0.0.1:5173/product/${id}`;

  const [openSocialModal, setOpenSocialModal] = useState(false);

  const openSocialModalOnClick = () => {
    setOpenSocialModal(true);
  };

  const closeSocialModal = () => {
    setOpenSocialModal(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          aria-label="Back"
          onClick={goBackOnClick}
          style={{ marginRight: "10px" }}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>

      <CoverProductGalleryContainer
        imgList={productData ? productData.galleryImages : []}
        galleryId={"productGallery"}
      />

      <Container>
        <Grid container padding={2} lg={12}>
          <Box>
            <div style={{ display: "flex" }}>
              <Typography variant="h4">
                {productData ? productData.name : ""}
              </Typography>
              <IconButton
                aria-label="Share"
                onClick={openSocialModalOnClick}
                style={{
                  marginLeft: 18,
                  paddingLeft: 2,
                  transition: "background-color 0.2s ease",
                }}
              >
                <ShareIcon />
              </IconButton>
              <Dialog open={openSocialModal} onClose={closeSocialModal}>
                <DialogTitle>Share on social media!</DialogTitle>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "25px",
                    paddingBottom: "5px",
                  }}
                >
                  <FacebookShareButton
                    url={shareUrl}
                    quote="Take a look at this catering!"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <div style={{ margin: 12 }}></div>{" "}
                  <TwitterShareButton
                    url={shareUrl}
                    title="Take a look at this catering!"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <div style={{ margin: 12 }}></div>{" "}
                  <EmailShareButton
                    url={shareUrl}
                    subject="Check this food caterer"
                    body="Hello! I invite you to take a look at this catering. You can find more details in the following link: "
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  <div style={{ margin: 12 }}></div>{" "}
                  <WhatsappShareButton
                    url={shareUrl}
                    title="Take a look at this catering!"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <div style={{ margin: 12 }}></div>{" "}
                </div>
              </Dialog>
            </div>
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
                          {productData
                            ? productData.starter.map((starterItem, index) => (
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
                            : ""}
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
                          {productData
                            ? productData.mainCourse.map((mainItem, index) => (
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
                            : ""}
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
                          {productData
                            ? productData.desserts.map(
                                (dessertsItem, index) => (
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
                                )
                              )
                            : ""}
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
                          {productData
                            ? productData.drinks.map((dessertsItem, index) => (
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
                            : ""}
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
                ></Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["MobileDatePicker"]}>
                    <DemoItem label="Select reserve date">
                      <MobileDatePicker
                        defaultValue={dayjs()}
                        onAccept={handleDateAccept}
                        shouldDisableDate={isDateUnavailable}
                        renderInput={(props) => <input {...props} readOnly={!isUserLoggedIn} />}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={openReserveDialog}
                  disabled={!isUserLoggedIn} 
                >
                  RESERVE
                </Button>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: "2vw"}}>
                  <Rating
                    name="combined-rating"
                    value={userRating !== null ? userRating : averageRating}
                    precision={0.1}
                    readOnly={userRating !== null || !isUserLoggedIn}
                    onChange={(event, newValue) => handleRatingChange(newValue)}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  <Typography>{userRating !== null ? userRating : averageRating}</Typography>
                </Box>
              </Container>
            </Paper>
          </Grid>
        </Grid>
        <Box height={50} />
      </Container>
      {showWarning && (
        <Snackbar
          open={handleNotLoggedClick}
          autoHideDuration={3000} // Controla la duración del Snackbar
          onClose={() => setShowWarning(false)}
        >
           <Alert severity="warning">
            <AlertTitle>Error</AlertTitle>
            You need to be logged in to perform this action.
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ProductDetailDisplay;
