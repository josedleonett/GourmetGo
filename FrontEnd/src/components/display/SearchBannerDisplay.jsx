import { useState, useRef } from 'react';
import { Box, FormControl, TextField, Autocomplete } from "@mui/material";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Divider from '@mui/material/Divider';
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import PlaceholderSearchBannerDisplay from "./PlaceholderSearchBannerDisplay";
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBannerDisplay = ({
  filterList,
  filterBundle,
  selectedBundle,
  onBundleSelected, 
  dates
}) => {
  const searchInputRef = useRef(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [categoryId, setCategoryId] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptionsState, setFilteredOptionsState] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([])
  const [selectedFilter, setSelectedFilter] = useState([]);
  const navigate = useNavigate();

  const handleSelectedFiltersChange = (newSelectedFilters) => {
    setSelectedFilter(newSelectedFilters);
  };

  const clearSearchInput = () => {
    setSearchInput("");
  };

  const handleSearchSelect = (newValue) => {
    if (newValue) {
      onBundleSelected(newValue); 
    }
  };


  
  const selectedFiltersArray = selectedFilter
  .map((item) => Object.values(item.bundles))
  .flat();

  const selectedFiltersId = selectedFilter
  .map((item) => item.id)
  .join(";");

  const handleSearchIconClick = () => {
    const searchValue = searchInputRef.current.value;
      if ((filteredOptionsState !== "" && filteredOptionsState !== null) || (selectedFiltersId !== null && selectedFiltersId !== "")) {
        navigate(`/search?filteredOptions=${filteredOptionsState}&selectedFiltersId=${selectedFiltersId}`);
      } else if ((searchValue !== "" && searchValue !== null)  || (selectedFiltersId !== null && selectedFiltersId !== "")) {
        navigate(`/search?filteredOptions=${searchValue}&selectedFiltersId=${selectedFiltersId}`);
      }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const searchValue = searchInputRef.current.value;
      if (searchValue.trim() !== "") {
        if ((filteredOptionsState !== "" && filteredOptionsState !== null) || (selectedFiltersId !== null && selectedFiltersId !== "")) {
          navigate(`/search?filteredOptions=${filteredOptionsState}&selectedFiltersId=${selectedFiltersId}`);
        } else if ((searchValue !== "" && searchValue !== null)  || (selectedFiltersId !== null && selectedFiltersId !== "")) {
          navigate(`/search?filteredOptions=${searchValue}&selectedFiltersId=${selectedFiltersId}`);
        }
      }
    }
  };

  const bundleNames = filterBundle.map((bundle) => bundle.name);

  const toggleCalendarVisibility = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDateCancel = () => {
    handleCloseCalendar();
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
  
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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
        <Divider orientation="vertical" flexItem />
        {!isSmallScreen && ( // Renderiza PlaceholderSearchBannerDisplay solo si no es un dispositivo pequeño
          <PlaceholderSearchBannerDisplay
            filterList={filterList}
            handleCategorySelect={handleSelectedFiltersChange}
          />
        )}
        {!isSmallScreen && (<Divider orientation="vertical" flexItem />)}
        <Autocomplete
          id="searchInput"
          options={selectedFiltersArray.length === 0 ? bundleNames : selectedFiltersArray}
          value={selectedBundle}
          onKeyPress={handleKeyPress}
          freeSolo
          size="small"
          filterOptions={(options, state) => {
            const filteredOptions = options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
            setFilteredOptionsState(state.inputValue.toLowerCase());
            return filteredOptions;
          }}
          getOptionLabel={(option) => option} 
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
        />
        <SearchIcon
          sx={{ padding: "8px", minWidth: "3%", cursor: "pointer" }}
          onClick={handleSearchIconClick}
        />
      </FormControl>
    </Box>
  );
};

export default SearchBannerDisplay;
