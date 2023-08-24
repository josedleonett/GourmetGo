import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardProductGridContainer from "../../components/container/CardProductGridContainer";
import CardProductContainer from '../container/CardProductContainer';

const CategoryFilterDisplay = (categoryData, bundlesData) => {
    console.log(categoryData.bundlesData)
  return (
    <Box sx={{backgroundColor: "grey", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2vw"}}>
            <CardProductGridContainer list={categoryData.bundlesData}/>
    </Box>
  )
}

export default CategoryFilterDisplay