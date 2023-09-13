import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import CardProductGridContainer from "../../components/container/CardProductGridContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const CategoryFilterDisplay = (categoryData, bundlesData) => {
  const navigate = useNavigate();
  const goBackOnClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ backgroundColor: "grey", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "2vw" }}>
      <IconButton
        aria-label="Back"
        onClick={goBackOnClick}
        sx={{marginBottom: "8px"}}
      >
        <ArrowBackIcon />
      </IconButton>
      <CardProductGridContainer list={categoryData.bundlesData} />
    </Box>
  )
}

export default CategoryFilterDisplay;
