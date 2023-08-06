import {
  Box,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBannerDisplay = ({
  searchInputValue,
  searchInputOnChange,
  filterList,
  searchSelectOnChange,
}) => {
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
        <TextField
          id="searchInput"
          placeholder="Search bundles"
          value={searchInputValue}
          onChange={searchInputOnChange}
          size="small"
          fullWidth
          sx={{
            "& fieldset": { border: "none" },
          }}
        />
        <Select
          id="searchSelect"
          autoWidth
          value={filterList}
          onChange={searchSelectOnChange}
          size="small"
          sx={{ padding: "8px", minWidth: "20%" }}
        />
      </FormControl>
    </Box>
  );
};

export default SearchBannerDisplay;
