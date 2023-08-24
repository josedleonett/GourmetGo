import Box from '@mui/material/Box';
import CardProductGridContainer from "../../components/container/CardProductGridContainer";

const CategoryFilterDisplay = (categoryData, bundlesData) => {
  return (
    <Box sx={{backgroundColor: "grey", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2vw"}}>
            <CardProductGridContainer list={categoryData.bundlesData}/>
    </Box>
  )
}

export default CategoryFilterDisplay