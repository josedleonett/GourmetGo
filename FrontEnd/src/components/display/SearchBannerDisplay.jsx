import { Box, FormControl, TextField, Autocomplete } from "@mui/material";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Divider from '@mui/material/Divider';
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import PlaceholderSearchBannerDisplay from "./PlaceholderSearchBannerDisplay";
import React, { useCallback, useRef, useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';

const SearchBannerDisplay = ({
  searchInputValue,
  searchInputOnChange,
  filterList,
  searchSelectOnChange,
  selectedFilter,
  filterBundle,
  selectedBundle,
  onBundleSelected, 
  onSearchIconClick, 
  onCategorySelect
}) => {
  const searchInputRef = useRef(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState(null);

  const handleSearchSelect = (newValue) => {
    if (newValue) {
      onBundleSelected(newValue); 
    }
  };

  const handleSearchIconClick = useCallback(() => {
    const newValue = searchInputRef.current.value;
    onSearchIconClick(newValue);
    console.log(newValue);
  }, [onSearchIconClick]);

  const handleOptionSelect = (_, option) => {
    if (option) {
      searchInputRef.current.value = option.name;
      onBundleSelected(option.name);
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      const newValue = searchInputRef.current.value;
      handleSearchSelect(newValue);
    }
  };

  const toggleCalendarVisibility = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
  };
  const handleDateAccept = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
    console.log(dayjs(date.$d).format('YYYY-MM-DD'));
  };

  const handleDateCancel = () => {
    handleCloseCalendar();
  };

  useEffect(() => {
    fetch(`http://localhost:8080/v1/booking/dates`)
      .then(response => response.json())
      .then(data => setDates(data))
      .catch(error => console.error('Error fetching product data:', error));
  });

  const isDateUnavailable = (date) => {
    if (!dates) {
      return false;
    }

    const formattedDate = date.format("YYYY-MM-DD");
    const unavailableDates = dates.map((item) => item.date);

    return unavailableDates.includes(formattedDate);
  };

  return (
    <Box
      component="section"
      backgroundColor="secondary.light"
      padding="20px"
      display="flex"
      justifyContent="center"
    >
      <FormControl
        variant="standard"
        sx={{
          bgcolor: "Background",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingY: 0.5,
          paddingX: 1,
          minWidth: "50vw",
          gap: "1vw"
        }}
      >
        <EventIcon
          sx={{ padding: "1vw", minWidth: "3%", cursor: "pointer" }}
          onClick={toggleCalendarVisibility}
        />
        {isCalendarVisible && (
          <Dialog open={isCalendarVisible} onClose={handleCloseCalendar}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker onAccept={handleDateAccept} 
                                onClose={handleCloseCalendar}
                                shouldDisableDate={isDateUnavailable}
              />
            </LocalizationProvider>
          </Dialog>
        )}
        <Divider orientation="vertical" flexItem/>
        <PlaceholderSearchBannerDisplay filterList={filterList}/>
        <Divider orientation="vertical" flexItem />
        <SearchIcon
          sx={{ padding: "8px", minWidth: "3%", cursor: "pointer" }}
          onClick={handleSearchIconClick}
        />
        <Autocomplete
          id="searchInput"
          options={filterBundle}
          value={selectedBundle}
          size="small"
          onChange={(e, newValue) => onCategorySelect(newValue)}
          filterOptions={(options, state) => {
            return options.filter((option) =>
              option.name.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
          getOptionLabel={(option) => option.name} 
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search bundles"
              fullWidth
              sx={{
                "& fieldset": { border: "none" },
              }}
              inputRef={searchInputRef} 
            />
          )}
          onInputChange={(_, newInputValue) => {
            searchInputOnChange(newInputValue);
          }}
        />
      </FormControl>
    </Box>
  );
};

export default SearchBannerDisplay;
