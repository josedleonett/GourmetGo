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
import dayjs from 'dayjs';
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBannerDisplay = ({
  filterList,
  filterBundle,
  selectedBundle,
  onBundleSelected, 
  onSearchIconClick, 
}) => {
  const searchInputRef = useRef(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState(null);
  const [categoryId, setCategoryId] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredOptionsState, setFilteredOptionsState] = useState([]);

  const clearSearchInput = () => {
    setSearchInput("");
  };

  const handleSearchSelect = (newValue) => {
    if (newValue) {
      onBundleSelected(newValue); 
    }
  };

  const handleSearchIconClick = () => {
    const newValue = searchInputRef.current.value;
    if (newValue) {
      onSearchIconClick(newValue);
    } else if (categoryId.length !== 0) {
        window.location.href = `http://127.0.0.1:5173/category/${encodeURIComponent(categoryId)}`;
    }
  };

  const bundleNames = filterBundle.map((bundle) => bundle.name);

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      const newValue = searchInputRef.current.value;
      handleSearchSelect(newValue);
    }
  };

  

  const selectedFiltersArray = selectedFilters
  .map((item) => Object.values(item.bundles))
  .flat();

  const handleSelectedFiltersChange = (newSelectedFilters) => {
    setSelectedFilters(newSelectedFilters);
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
  };

  const handleDateCancel = () => {
    handleCloseCalendar();
  };

  const isDateUnavailable = (date) => {
    if (!dates) {
      return false;
    }
  }

  // Verificar si el ancho de la pantalla es menor que un cierto valor (por ejemplo, 600px)
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
            onSelectedFiltersChange={handleSelectedFiltersChange}
          />
        )}
        {!isSmallScreen && (<Divider orientation="vertical" flexItem />)}
        <SearchIcon
          sx={{ padding: "8px", minWidth: "3%", cursor: "pointer" }}
          onClick={handleSearchIconClick}
        />
        <Autocomplete
          id="searchInput"
          options={selectedFiltersArray.length === 0 ? bundleNames : selectedFiltersArray}
          value={selectedBundle}
          onKeyPress={handleInputKeyPress}
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
      </FormControl>
    </Box>
  );
};

export default SearchBannerDisplay;
