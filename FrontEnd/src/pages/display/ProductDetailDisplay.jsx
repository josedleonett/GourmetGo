import { MdLocalBar } from "react-icons/md";
import { GiPieSlice } from "react-icons/gi";
import { RiRestaurant2Line } from "react-icons/ri";
import { BiDish } from "react-icons/bi";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
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
  Stack
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { cateringPackages } from "../../test/dataApiSample";
import { useNavigate, useParams } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { red } from '@mui/material/colors';
import Lightbox from "react-lightbox-component";
import CoverProductGalleryContainer from "../../components/container/CoverProductGalleryContainer";

const ProductDetailDisplay = ({productData, dates}) => {
  const packageList = cateringPackages;
  const { id } = useParams();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const openReserveDialog = () => {
    setOpenDialog(true);
  };

  const closeReserveDialog = () => {
    setOpenDialog(false);
  };

  console.log(dates)


  const goBackOnClick = () => {
    navigate("/");
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSendDate = () => {
    if (selectedDate) {
      console.log('Selected Date:', selectedDate.toISOString());
    }
  };

  const handleDateAccept = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    console.log(formattedDate);
  };

  const isDateUnavailable = (date) => {
    if (!dates) {
      return false; // No hay datos de fechas, no se deshabilita ninguna
    }

    const formattedDate = date.format("YYYY-MM-DD");
    const unavailableDates = dates.map((item) => item.date);

    return unavailableDates.includes(formattedDate);
  };

  const renderCustomDay = (day, selectedDate, isInCurrentMonth, dayComponent) => {
    const isUnavailable = isDateUnavailable(day);
    
    return (
      <div style={{ position: 'relative' }}>
        {dayComponent}
        {isUnavailable && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: red[500],
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              •
            </div>
          </div>
        )}
      </div>
    );
  };


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
                sx={{ display: "flex", flexDirection: "column", gap: 1}}
              >

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  color={"secondary.main"}
                >
                </Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                  components={[
                    'MobileDatePicker',
                  ]}
                  >
                    <DemoItem label="Select reserve date">
                      <MobileDatePicker 
                        defaultValue={dayjs()}
                        onAccept={handleDateAccept}
                        shouldDisableDate={isDateUnavailable}
                        renderDay={renderCustomDay}
                        renderInput={(props) => <input {...props} readOnly />}                         
                      />
                    </DemoItem>  
                  </DemoContainer>
                </LocalizationProvider>
                <Button variant="contained" color="secondary" onClick={openReserveDialog}>
                  RESERVE
                </Button>
                

                <Dialog onClose={closeReserveDialog} open={openDialog}>
                  <DialogTitle sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    Select your reserve date
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DateCalendar
                        onChange={handleDateChange}
                       renderInput={(props) => <input {...props} readOnly />}
                      />
                    </LocalizationProvider>
                    <Button onClick={handleSendDate} variant="contained" color="primary">
                      Send Selected Date
                    </Button>
                  </DialogTitle>
                </Dialog>
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
