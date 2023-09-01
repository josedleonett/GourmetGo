import { Box, FormControl, TextField, Autocomplete } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event"; // Importa el ícono de calendario
import PlaceholderSearchBannerDisplay from "./PlaceholderSearchBannerDisplay";
import React, { useCallback, useRef, useState } from 'react';

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
}) => {
  const searchInputRef = useRef(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

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
          justifyContent: "space-between",
          paddingY: 0.5,
          paddingX: 1,
          minWidth: "50vw",
        }}
      >
        <SearchIcon
          sx={{ padding: "8px", minWidth: "3%", cursor: "pointer" }}
          onClick={handleSearchIconClick}
        />
        <Autocomplete
          id="searchInput"
          options={filterBundle}
          value={selectedBundle}
          onKeyPress={handleInputKeyPress}
          size="small"
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
        <PlaceholderSearchBannerDisplay filterList={filterList}/>
        <EventIcon
          sx={{ padding: "8px", minWidth: "3%", cursor: "pointer" }}
          onClick={toggleCalendarVisibility}
        />
        {isCalendarVisible && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        )}
      </FormControl>
    </Box>
  );
};

export default SearchBannerDisplay;
