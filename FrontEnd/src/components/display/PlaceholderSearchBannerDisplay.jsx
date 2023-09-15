import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

const PlaceholderSearchBannerDisplay = ({
  filterList,
  handleCategorySelect,
  handleCategoryId
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const searchSelectOnChange = (event, newValue) => {
    setSelectedFilters(newValue);
    handleCategorySelect(newValue);
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
                style: { width: "auto" }, // Establecer el ancho automático
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
          sx={{ minWidth: "150px" }}
        />
      </FormControl>
    </>
  );
};

export default PlaceholderSearchBannerDisplay;
