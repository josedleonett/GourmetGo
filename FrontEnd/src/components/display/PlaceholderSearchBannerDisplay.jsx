import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const PlaceholderSerchBannerDisplay = ({ filterList }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const searchSelectOnChange = (event) => {
    setSelectedFilter(event.target.value);
  };

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
        {filterList.map((filterItem, index) => (
          <MenuItem key={index} value={filterItem}>
            {filterItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PlaceholderSerchBannerDisplay;
