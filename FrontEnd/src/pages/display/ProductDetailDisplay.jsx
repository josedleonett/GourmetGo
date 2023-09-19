import { useState, useEffect } from "react";
import { MdLocalBar } from "react-icons/md";
import { GiPieSlice } from "react-icons/gi";
import { RiRestaurant2Line } from "react-icons/ri";
import { BiDish, BiSend } from "react-icons/bi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import AddCommentIcon from '@mui/icons-material/AddComment';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
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
  Tooltip,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  AlertTitle,
  Snackbar,
  Avatar,
  Toolbar,
  LinearProgress,
  Pagination,
  Skeleton,
  TextField,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Stack,
} from "@mui/material";
import { bundleComments, cateringPackages } from "../../test/dataApiSample";
import { useNavigate, useParams } from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import CoverProductGalleryContainer from "../../components/container/CoverProductGalleryContainer";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";

const ProductDetailDisplay = ({ productData, dates, accessToken }) => {
  const packageList = cateringPackages;
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isFavorite, setIsFavorite] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [userHasRating, setUserHasRating] = useState(false);
  const [totalRatings, setTotalRatings] = useState(null);
  const [hover, setHover] = useState(-1);
  const [showWarning, setShowWarning] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [CommentsPage, setCommentsPage] = useState(1);
  const commentsPerPage = 5;
  const startIndex = (CommentsPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;

  const today = new Date().toISOString().split('T')[0];


  function countCommentsByRating(comments) {
    const ratingCounts = {};
  
    comments.forEach((comment) => {
      const rating = Math.floor(comment.rating);
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });
  
    for (let rating = 1; rating <= 5; rating++) {
      if (!(rating in ratingCounts)) {
        ratingCounts[rating] = 0;
      }
    }
  
    const result = Object.entries(ratingCounts).map(([rating, count]) => ({
      rating: parseInt(rating),
      count,
    }));
  
    result.sort((a, b) => a.rating - b.rating);
  
    return result;
  }

  function getRandomNumber(min = 20 , max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let decodedToken;
  if (cookies.token !== undefined) {
    decodedToken = jwtDecode(cookies.token);
  }
  if (accessToken !== undefined && cookies.token) {
    decodedToken = jwtDecode(cookies.token);
  }
  const initials =
    decodedToken && decodedToken.name && decodedToken.lastName
      ? decodedToken.name.charAt(0) + decodedToken.lastName.charAt(0)
      : "";
  const userFullName =
    decodedToken && decodedToken.name && decodedToken.lastName
      ? `${decodedToken.name} ${decodedToken.lastName}`
      : "";

  useEffect(() => {
    if (productData && typeof productData.favorite === "boolean") {
      setIsFavorite(productData.favorite);
    }
  }, [productData]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    const bundleId = id;
    if (isFavorite !== null && isFavorite) {
      fetch(
        `http://localhost:8080/v1/user/${decodedToken.id}/favorites/${bundleId}`,
        {
          method: "DELETE",
        }
      );
    } else {
      fetch(
        `http://localhost:8080/v1/user/${decodedToken.id}/favorites/${bundleId}`,
        {
          method: "POST",
        }
      );
    }
  };

  useEffect(() => {
    if (productData) {
      if (typeof productData.rating === "number") {
        setAverageRating(productData.rating);
      }
      if (typeof productData.totalRates === "number") {
        setTotalRatings(productData.totalRates);
      }
    }
  }, [productData]);

  useEffect(() => {
    if (cookies.token && cookies.token !== "") {
      if (decodedToken) {
        setIsUserLoggedIn(true);
      } else {
        setShowWarning(true);
      }
    }
  }, []);

  useEffect(() => {
    if (productData && typeof productData.ratings === "number") {
      const initialAverageRating = productData.ratings || 0;
      setAverageRating(initialAverageRating);
    }
  }, [productData]);

  const handleRatingChange = (newValue) => {
    setUserRating(newValue);
    setUserHasRating(true);

  const newTotalRatings = totalRatings + 1;
  const newAverageRating =
  (averageRating * (totalRatings) + newValue) / newTotalRatings;

    setTotalRatings(newTotalRatings);
    setAverageRating(newAverageRating);
    fetch(
      `http://localhost:8080/v1/bundle/rating/${productData.id}?rating=${newAverageRating}&totalRates=${newTotalRatings}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const openReserveModal = () => {
    if (dates && Array.isArray(dates) && dates.length > 0) {
      const unavailableDates = dates.map((item) => item.date);
      setOpenDialog(true);
    } else {
      console.error("Error: 'dates' no se ha cargado correctamente.");
    }
  };

  const closeReserveDialog = () => {
    setOpenDialog(false);
  };

  const goBackOnClick = () => {
    navigate("/");
  };

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
  };

  const isDateUnavailable = (date) => {
    if (!dates) {
      return false;
    }
    const formattedDate = date.format("YYYY-MM-DD");
    const unavailableDates = dates.map((item) => item.date);

    return unavailableDates.includes(formattedDate);
  };
  const shareUrl = window.location.href;

  const [openSocialModal, setOpenSocialModal] = useState(false);

  const openSocialModalOnClick = () => {
    setOpenSocialModal(true);
  };

  const closeSocialModal = () => {
    setOpenSocialModal(false);
  };

  function getFullnameInitials(fullname) {
    const words = fullname.split(' ');
    const fullnameInitials = words.slice(0, 2).map(word => word[0].toUpperCase()).join('');
    return fullnameInitials;
  }

  const initialValues = {
    NumberDinners: "",
    drinks: [],
  };

  const handleSubmit = (values) => {
    console.log("Valores del formulario:", values);
  };

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const handleConfirmClick = () => {
    setOpenConfirmationModal(true);
  };

  const handleCancelClick = () => {
    setOpenConfirmationModal(false);
  };

  const formikAddReview = useFormik({
    initialValues: {
      userId: decodedToken && decodedToken.id,
      name: userFullName,
      bundle: parseInt(id),
      date: today,
      rating: 0,
      title: "",
      body: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  return (
    <Box padding={2}>
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
        isLoading={!productData}
      />

      <Container>
        <Grid container padding={2} lg={12}>
          <Box>
            <Box display="flex" minWidth="30vw">
              <Typography variant="h4">
                {productData ? (
                  productData.name
                ) : (
                  <Skeleton variant="text" width="30vw" />
                )}
              </Typography>
              <IconButton
                disabled={!decodedToken}
                aria-label="Favorite"
                style={{
                  marginLeft: 18,
                  paddingLeft: 2,
                  transition: "background-color 0.2s ease",
                }}
              >
                {" "}
                {decodedToken ? (
                  <span>
                    <Tooltip
                      title={
                        isFavorite
                          ? "Delete from favorites"
                          : "Add to favorites"
                      }
                      placement="top"
                    >
                      {isFavorite ? (
                        <FavoriteIcon
                          onClick={handleFavoriteClick}
                          sx={{
                            zIndex: 5,
                            cursor: "pointer",
                            color: "error.main",
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          onClick={handleFavoriteClick}
                          sx={{
                            zIndex: 5,
                            cursor: "pointer",
                            color: "error.main",
                          }}
                        />
                      )}
                    </Tooltip>
                  </span>
                ) : (
                  <span></span>
                )}
              </IconButton>
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
            </Box>
            <Typography variant="subtitle1" fontStyle="italic">
              {productData ? (
                productData.description
              ) : (
                <Skeleton variant="text" width="100%" />
              )}
            </Typography>
          </Box>
          <Divider light />

          <Grid item lg={8} md={7} xs={12}>
            <Container>
              <Container>
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {productData ? (
                        <BiDish size="30" />
                      ) : (
                        <Skeleton variant="circular" width={40} height={40} />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        productData ? (
                          "Starter:"
                        ) : (
                          <Skeleton variant="text" width={150} />
                        )
                      }
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
                            <>
                              <Skeleton variant="text" width="80%" />
                              <Skeleton variant="text" width="50%" />
                            </>
                          )}
                        </>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />

                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {productData ? (
                        <RiRestaurant2Line size="30" />
                      ) : (
                        <Skeleton variant="circular" width={40} height={40} />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        productData ? (
                          "Main course:"
                        ) : (
                          <Skeleton variant="text" width={150} />
                        )
                      }
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
                            <>
                              <Skeleton variant="text" width="80%" />
                              <Skeleton variant="text" width="50%" />
                            </>
                          )}
                        </>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />

                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {productData ? (
                        <GiPieSlice size="30" />
                      ) : (
                        <Skeleton variant="circular" width={40} height={40} />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        productData ? (
                          "Dessert:"
                        ) : (
                          <Skeleton variant="text" width={150} />
                        )
                      }
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
                            <>
                              <Skeleton variant="text" width="80%" />
                              <Skeleton variant="text" width="50%" />
                            </>
                          )}
                        </>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />

                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {productData ? (
                        <MdLocalBar size="30" />
                      ) : (
                        <Skeleton variant="circular" width={40} height={40} />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        productData ? (
                          "Drinks:"
                        ) : (
                          <Skeleton variant="text" width={150} />
                        )
                      }
                      secondary={
                        <>
                          {productData ? (
                            productData.drinks.map((drinks, index) => (
                              <div key={index}>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {drinks.name}
                                </Typography>
                              </div>
                            ))
                          ) : (
                            <>
                              <Skeleton variant="text" width="80%" />
                              <Skeleton variant="text" width="50%" />
                            </>
                          )}
                        </>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />

                  <ListItem alignItems="flex-start" sx={{ pt: 3 }}>
                    <Button
                      size="small"
                      onClick={() => {
                        setOpenTermsDialog(true);
                      }}
                    >
                      See terms and conditions
                    </Button>
                    <Dialog
                      open={openTermsDialog}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {`Terms and conditions for ${
                          productData ? productData.name : ""
                        } bundle`}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          variant="caption"
                          sx={{
                            wordBreak: "break-word",
                            whiteSpace: "pre-line",
                          }}
                          align="justify"
                        >
                          {productData
                            ? productData.terms !== null &&
                              productData.terms !== ""
                              ? productData.terms
                              : "Contact us to know our terms and conditions for this bundle"
                            : "Error loading terms and conditions.."}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            setOpenTermsDialog(false);
                          }}
                          autoFocus
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </ListItem>
                </List>
              </Container>
            </Container>
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            <Paper elevation={6} sx={{ py: 4, px: 1 }}>
              <Container
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                {!openDialog ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileDatePicker"]}>
                      <DemoItem label="Select reserve date">
                        <MobileDatePicker
                          defaultValue={dayjs()}
                          onAccept={(date) => {
                            setSelectedDate(date);
                            handleDateAccept(date);
                          }}
                          shouldDisableDate={isDateUnavailable}
                          readOnly={!isUserLoggedIn}
                          renderInput={(props) => (
                            <input {...props} readOnly={!isUserLoggedIn} />
                          )}
                        />
                      </DemoItem>
                    </DemoContainer>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={openReserveModal}
                      disabled={!isUserLoggedIn}
                    >
                      RESERVE
                    </Button>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2vw",
                      }}
                    >
                      <Rating
                        name="combined-rating"
                        value={userRating !== null ? userRating : averageRating}
                        precision={0.1}
                        readOnly={userRating !== null || !isUserLoggedIn}
                        onChange={(event, newValue) =>
                          handleRatingChange(newValue)
                        }
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      <Typography>
                        {userRating !== null
                          ? userRating.toFixed(1)
                          : averageRating !== null
                          ? averageRating.toFixed(1)
                          : ""}
                      </Typography>
                    </Box>
                  </LocalizationProvider>
                ) : (
                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                      <Form>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            gap: 2,
                          }}
                        >
                          {openDialog && (
                            <IconButton
                              color="primary"
                              onClick={closeReserveDialog}
                              sx={{ marginLeft: "auto" }}
                            >
                              <CloseIcon />
                            </IconButton>
                          )}
                          <Typography
                            variant="h4"
                            sx={{ backgroundColor: "secondary.light" }}
                          >
                            Reserve catering
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-evenly",
                              gap: 2,
                            }}
                          >
                            <TextField
                              sx={{ width: 225 }}
                              disabled
                              id="filled-basic"
                              fullWidth
                              variant="filled"
                              label="Name"
                              readOnly={true}
                              helperText={<ErrorMessage name="NumberDinners" />}
                              value={
                                decodedToken.name + " " + decodedToken.lastName
                              }
                            />
                            <TextField
                              disabled
                              id="filled-basic"
                              name="email"
                              fullWidth
                              variant="filled"
                              label="Email"
                              readOnly={true}
                              helperText={<ErrorMessage name="NumberDinners" />}
                              value={decodedToken.email}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                disabled
                                fullWidth
                                readOnly={true}
                                value={selectedDate}
                              />
                            </LocalizationProvider>
                            <Field
                              type="number"
                              name="NumberDinners"
                              as={TextField}
                              fullWidth
                              variant="outlined"
                              label="Amount of people"
                              helperText={<ErrorMessage name="NumberDinners" />}
                            />
                          </Box>
                          <Box p={2}>
                            <Typography
                              variant="h6"
                              sx={{
                                backgroundColor: "secondary.light",
                                textAlign: "center",
                              }}
                            >
                              Number of drinks:
                            </Typography>
                            <FieldArray name="drinks">
                              {({ push, remove }) => (
                                <Box sx={{ display: "flex", paddingTop: 2 }}>
                                  <Paper>
                                    <Container
                                      sx={{
                                        padding: 3,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        gap: 2,
                                      }}
                                    >
                                      {productData
                                        ? productData.drinks.map((_, index) => (
                                            <>
                                              {console.log(
                                                productData.drinks[index].name
                                              )}
                                              <TextField
                                                type="number"
                                                name={`drinks[${index}]`}
                                                fullWidth
                                                variant="outlined"
                                                label={
                                                  productData.drinks[index].name
                                                }
                                                helperText={
                                                  <ErrorMessage
                                                    name={`drinks[${index}]`}
                                                  />
                                                }
                                              />
                                            </>
                                          ))
                                        : []}
                                    </Container>
                                  </Paper>
                                </Box>
                              )}
                            </FieldArray>
                          </Box>
                          <Box p={2}>
                            <Typography
                              variant="h6"
                              sx={{
                                backgroundColor: "secondary.light",
                                textAlign: "center",
                              }}
                            >
                              Comments:
                            </Typography>
                            <Field
                              name="comments"
                              as={TextField}
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                              label="Write your comments here"
                              sx={{ marginTop: 2 }}
                            />
                          </Box>
                          <Box p={2}>
                            <Button
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={handleConfirmClick}
                            >
                              Confirm
                            </Button>
                            <Dialog
                              open={openConfirmationModal}
                              onClose={handleCancelClick}
                            >
                              <DialogTitle>
                                Catering reservation confirmation
                              </DialogTitle>
                              <DialogContent>
                                <Typography>
                                  Are you sure you want to confirm this
                                  reservation for this catering?
                                </Typography>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCancelClick}
                                  color="primary"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleConfirmClick}
                                  color="primary"
                                >
                                  Confirm
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                )}
              </Container>
            </Paper>
          </Grid>
        </Grid>

        <Box height={50} />

        <Typography variant="h5">Reviews:</Typography>
        <Box width="lg" display="flex" flexDirection="column" gap={3}>
          {productData && productData.reviews.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              py={2}
            >
              <CommentsDisabledIcon
                color="disabled"
                style={{ fontSize: 30, marginBottom: 16 }}
              />
              <Typography variant="h6" color="GrayText" gutterBottom>
                This catering package has no reviews yet.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Be the first to share your experience!
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection={{
                xs: "column-reverse",
                sm: "row",
                lg: "row",
              }}
              justifyContent="space-around"
              width="100%"
              py={2}
            >
              <Stack
                width={{ xs: "100%", sm: "70%", lg: "70%" }}
                justifyContent="space-evenly"
              >
                {productData
                  ? countCommentsByRating(productData.reviews).map(
                      (commentRatingCategory) => (
                        <Box
                          key={commentRatingCategory.rating}
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography>
                            {commentRatingCategory.rating}
                          </Typography>
                          <LinearProgress
                            value={
                              (commentRatingCategory.count /
                                productData.reviews.length) *
                              100
                            }
                            variant="determinate"
                            color="warning"
                            sx={{
                              width: "100%",
                              height: 10,
                              borderRadius: 5,
                              background: (theme) => theme.palette.grey[200],
                            }}
                          />
                        </Box>
                      )
                    )
                  : Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        width="100%"
                        height={20}
                        sx={{
                          borderRadius: 5,
                        }}
                      />
                    ))}
              </Stack>
              <Stack
                width={{ xs: "100%", sm: "30%", lg: "30%" }}
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                {productData ? (
                  <>
                    <Typography variant="h3" sx={{ lineHeight: 0.7 }}>
                      {productData.rating}
                    </Typography>
                    <Rating
                      value={productData.rating}
                      precision={0.1}
                      readOnly
                      size="large"
                    />
                    <Typography variant="caption">
                      {productData.reviews.length} ratings
                    </Typography>
                  </>
                ) : (
                  <>
                    <Skeleton variant="rectangular" width={60} height={40} />
                    <Skeleton
                      variant="rectangular"
                      width={150}
                      height={20}
                      sx={{ paddingBottom: 2 }}
                    />
                    <Skeleton variant="rectangular" width={100} height={15} />
                  </>
                )}
              </Stack>
            </Box>
          )}
          <Box
            display={
              (productData &&
                productData.canUserReview &&
                cookies.token == undefined) ||
              isCommentFormOpen
                ? "none"
                : "flex"
            }
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddCommentIcon />}
              onClick={() => setIsCommentFormOpen(true)}
            >
              ADD A REVIEW
            </Button>
          </Box>
          <Collapse in={isCommentFormOpen}>
            <Card raised sx={{ p: 2 }}>
              <form onSubmit={formikAddReview.handleSubmit}>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{initials}</Avatar>
                      </ListItemAvatar>
                      <Stack>
                        <ListItemText
                          primary={userFullName}
                          secondary={
                            "Please share your experience with the catering service. Your review will help others make informed decisions."
                          }
                        />
                        <Rating
                          id="rating"
                          value={formikAddReview.values.rating}
                          onChange={(event, newValue) => {
                            formikAddReview.setFieldValue("rating", newValue);
                          }}
                          size="large"
                          sx={{
                            "& .MuiRating-icon": {
                              width: 50,
                            },
                          }}
                        />
                      </Stack>
                    </ListItem>
                  </List>
                  <Container
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      id="title"
                      placeholder="Enter a title for your review"
                      variant="standard"
                      fullWidth
                      value={formikAddReview.values.title}
                      onChange={formikAddReview.handleChange}
                      inputProps={{
                        maxLength: 30,
                      }}
                    />
                    <TextField
                      id="body"
                      placeholder="Tell us about your catering adventure"
                      variant="standard"
                      multiline
                      fullWidth
                      value={formikAddReview.values.body}
                      onChange={formikAddReview.handleChange}
                      rows={4}
                      inputProps={{
                        maxLength: 250,
                      }}
                    />
                  </Container>
                </CardContent>
                <CardActions sx={{ justifyContent: "end" }}>
                  <Button
                    type="reset"
                    variant="text"
                    color="primary"
                    startIcon={<CancelIcon />}
                    onClick={() => {
                      setIsCommentFormOpen(false);
                      formikAddReview.resetForm();
                      formikAddReview.setFieldValue("rating", 0);
                    }}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    onClick={formikAddReview.handleSubmit}
                  >
                    SEND
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Collapse>

          <List sx={{ width: "100%" }}>
            {productData ? (
              productData.reviews
                .slice(startIndex, endIndex)
                .map((comment, index) => (
                  <Box key={index} py={1}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{getFullnameInitials(comment.name)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.name}
                        secondary={comment.date}
                      />
                      <Rating readOnly value={comment.rating} size="small" />
                    </ListItem>
                    <ListItemText
                      primary={comment.title}
                      secondary={comment.body}
                    />
                    <Divider sx={{ paddingTop: 3 }} />
                  </Box>
                ))
            ) : (
              <>
                {Array.from({ length: 5 }, (_, index) => (
                  <Box key={index} py={1}>
                    <ListItem>
                      <ListItemAvatar>
                        <Skeleton variant="circular" width={40} height={40} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Skeleton width={`${getRandomNumber()}%`} />}
                        secondary={<Skeleton width="20%" />}
                      />
                      <Skeleton width={100} height={30} />
                    </ListItem>
                    <ListItemText
                      primary={
                        <Skeleton height={30} width={`${getRandomNumber()}%`} />
                      }
                      secondary={
                        <>
                          <Skeleton width={`${getRandomNumber()}%`} />
                          <Skeleton width={`${getRandomNumber()}%`} />
                        </>
                      }
                    />
                    <Divider sx={{ paddingTop: 3 }} />
                  </Box>
                ))}
              </>
            )}
            <Stack spacing={2} alignItems="center">
              <Pagination
                count={Math.ceil(
                  productData && productData.reviews.length / commentsPerPage
                )}
                page={CommentsPage}
                onChange={(event, value) => setCommentsPage(value)}
              />
            </Stack>
          </List>
        </Box>
      </Container>
      {showWarning && (
        <Snackbar
          open={showWarning}
          autoHideDuration={3000}
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
