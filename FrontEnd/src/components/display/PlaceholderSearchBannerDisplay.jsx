import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

const PlaceholderSearchBannerDisplay = ({
  filterList,
  handleCategorySelect,
  handleCategoryId,
  onSelectedFiltersChange
  
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const searchSelectOnChange = (event, newValue) => {
    setSelectedFilters(newValue);
    setIsCategorySelected(newValue.length > 0);
    onSelectedFiltersChange(newValue);
  };
  


  return (
    <>
      <FormControl size="small" sx={{ padding: "8px", minWidth: "20%" }}>
        <Autocomplete
          multiple
          id="searchSelect"
          value={selectedFilters}
          onChange={searchSelectOnChange}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={filterList}
          getOptionLabel={(option) => option.name}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option.id}
                label={option.name}
                {...getTagProps({ index })}
                onDelete={() => {
                  const newSelectedFilters = [...selectedFilters];
                  newSelectedFilters.splice(index, 1);
                  searchSelectOnChange(null, newSelectedFilters);
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {selectedFilters.map((filter) => (
                      <Chip
                        key={filter.id}
                        label={filter.name}
                        onDelete={() => {
                          const newSelectedFilters = selectedFilters.filter(
                            (selectedFilter) =>
                              selectedFilter.id !== filter.id
                          );
                          searchSelectOnChange(null, newSelectedFilters);
                        }}
                      />
                    ))}
                  </>
                ),
              }}
            />
          )}
        />
      </FormControl>
    </>
  );
};

export default PlaceholderSearchBannerDisplay;