import { Autocomplete, Box, FormControl, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlaceholderSearchBannerDisplay from "./PlaceholderSearchBannerDisplay";

const SearchBannerDisplay = ({
  searchInputValue,
  searchInputOnChange,
  filterList,
  searchSelectOnChange,
  selectedFilter,
  filterBundle,
  selectedBundle,
}) => {
  const handleSearchSelect = (newValue) => {
    if (newValue) {
      const bundleName = newValue.toLowerCase();
      const url = `http://localhost:8080/v1/bundle/search?name=${encodeURIComponent(bundleName)}`;
      window.location.href = url; // Redirigir al URL
    }
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
        <SearchIcon sx={{ padding: "8px", minWidth: "3%" }} />
        <Autocomplete
          id="searchInput"
          options={filterBundle}
          value={selectedBundle}
          onChange={(event, newValue) => {
            searchInputOnChange(newValue);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSearchSelect(event.target.value);
            }
          }}
          size="small"
          filterOptions={(options, state) => {
            return options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search bundles"
              fullWidth
              sx={{
                "& fieldset": { border: "none" },
              }}
            />
          )}
        />
        <PlaceholderSearchBannerDisplay filterList={filterList}/>
      </FormControl>
    </Box>
  );
};

export default SearchBannerDisplay;
