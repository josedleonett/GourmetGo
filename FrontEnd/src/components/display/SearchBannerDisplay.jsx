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
import dayjs from "dayjs";

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


  const isDateUnavailable = (date) => {
    if (!dates) {
      return false;
    }
    const formattedDate = date.format("YYYY-MM-DD");
    const unavailableDates = dates.map((item) => item.date);

    return unavailableDates.includes(formattedDate);
  };
  
  const isSmallScreen = useMediaQuery("(max-width:600px)");

<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDateAcceptAndCheckUnavailable = (date) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      // Haz lo que necesites con la fecha formateada
      console.log("Selected Date:", formattedDate);
  
      // Ahora verifica si la fecha es inaccesible usando la función isDateUnavailable
      const isUnavailable = isDateUnavailable(dayjs(date));
      if (isUnavailable) {
        // La fecha seleccionada es inaccesible, realiza alguna acción aquí si es necesario
        console.log("Selected Date is unavailable.");
      }
    }
  };
  
  const minDate = dayjs().add(1, 'week');

>>>>>>> 0dc08e9bcfcfbcdd9362891939e46b07644b3333
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
<<<<<<< HEAD
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
=======
          {isCalendarVisible && (
            <Dialog open={isCalendarVisible} onClose={handleCloseCalendar}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
  onAccept={(date) => {
    handleDateAcceptAndCheckUnavailable(date);
    handleCloseCalendar();
  }}
  minDate={minDate}
  shouldDisableDate={(date) => isDateUnavailable(dayjs(date))}
/>
              </LocalizationProvider>
            </Dialog>
          )}
          <Divider orientation="vertical" flexItem />
          {!isSmallScreen && (
            <PlaceholderSearchBannerDisplay
              filterList={filterList}
              handleCategorySelect={handleSelectedFiltersChange}
>>>>>>> 0dc08e9bcfcfbcdd9362891939e46b07644b3333
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
