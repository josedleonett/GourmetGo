import React, { useState } from "react";
import CardProductContainer from "../container/CardProductContainer";
import { Grid, Pagination, Container, Box } from "@mui/material";

const CardProductGridDisplay = ({ list }) => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  console.log(list);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} columns={{ lg: 5, md: 3, sm: 1 }}>
        {list[page - 1].map((item) => (
          <Grid item key={item.id} lg={1} md={1} sm={1}>
            {
              <CardProductContainer
                img={item.bundleImage}
                title={item.name}
                description={item.description}
              />
            }
          </Grid>
        ))}
      </Grid>
      <Box
        padding={2}
        display="flex"
        alignContent="center"
        justifyContent="center"
      >
        <Pagination count={list.length} page={page} onChange={handleChange} />
      </Box>
    </Container>
  );
};

export default CardProductGridDisplay;
