import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";

const PlaceholderSearchBannerDisplay = ({
  filterList,
  handleCategorySelect,
  handleCategoryId,
}) => {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);


  const searchSelectOnChange = (event, newValue) => {
    // if (newValue) {
    //   const selectedCategoryId = newValue.id;
    //   setSelectedFilter(newValue.name);
    //   setIsCategorySelected(true);
    //   const selectedCategory = filterList.find(
    //     (item) => item.id === selectedCategoryId
    //   );
    //   const bundlesArray = selectedCategory
    //     ? Object.values(selectedCategory.bundles)
    //     : [];
    //   handleCategoryId(selectedCategoryId);
    //   handleCategorySelect(bundlesArray);
    // } else {
    //   setSelectedFilter("");
    //   setIsCategorySelected(false);
    //   handleCategoryId([]);
    //   handleCategorySelect([]);
    // }
    setSelectedFilters(newValue);

  };

  const handleClearSearchInput = () => {
    searchSelectOnChange(null, null);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && isCategorySelected) {
        window.location.href = `http://127.0.0.1:5173/category/${encodeURIComponent(
          selectedFilter
        )}`;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isCategorySelected, selectedFilter]);

  return (
    <>
      <FormControl size="small" sx={{ padding: '8px', minWidth: '20%' }}>
      <Autocomplete
        multiple
        id="searchSelect"
        value={selectedFilter}
        onChange={searchSelectOnChange}
        options={filterList}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Categories" variant="standard" />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={`chip-${index}`}
              variant="filled"
              label={option.name}
              color="secondary"
            />
          ))
        }
      />
    </FormControl>
      <IconButton
        aria-label="Clear search input"
        onClick={handleClearSearchInput}
        edge="end"
      >
        <ClearIcon />
      </IconButton>
    </>
  );
};

export default PlaceholderSearchBannerDisplay;