import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";

const PlaceholderSearchBannerDisplay = ({
  filterList,
  handleCategorySelect,
  handleCategoryId,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const searchSelectOnChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedFilter(selectedCategoryId);
    setIsCategorySelected(true);
    const selectedCategory = filterList.find(
      (item) => item.id === selectedCategoryId
    );
    const bundlesArray = selectedCategory
      ? Object.values(selectedCategory.bundles)
      : [];
    handleCategoryId(selectedCategoryId);
    handleCategorySelect(bundlesArray);
  };

  const handleClearSearchInput = () => {
    handleCategorySelect([]);
    handleCategoryId([]);
    setSelectedFilter("");
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

  const labelStyle = {
    position: "absolute",
    top: selectedFilter === "" ? "50%" : "8px",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: selectedFilter === "" ? "16px" : "inherit",
    color: selectedFilter === "" ? "gray" : "inherit",
    transition: "top 0.2s, font-size 0.2s, color 0.2s",
    background: "white",
    paddingLeft: "4px",
    paddingRight: "4px",
  };

  return (
    <>
      <FormControl size="small" sx={{ padding: "8px", minWidth: "20%" }}>
        <InputLabel style={labelStyle}>Categories</InputLabel>
        <Select
          id="searchSelect"
          autoWidth
          value={selectedFilter}
          onChange={searchSelectOnChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {filterList.map((filterItem) => (
            <MenuItem key={filterItem.id} value={filterItem.id}>
              {filterItem.name}
            </MenuItem>
          ))}
        </Select>
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
