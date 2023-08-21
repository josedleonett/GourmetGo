import { useState, useRef } from "react";
import CardProductContainer from "../container/CardProductContainer";
import { Grid, Pagination, Container, Box } from "@mui/material";

const CardProductGridDisplay = ({ list }) => {
  const [page, setPage] = useState(1);
  const containerRef = useRef(null); 

  const handleChange = (event, value) => {
    event.preventDefault();
    setPage(value);

    containerRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <Container maxWidth="xl" ref={containerRef} >
      <Grid container spacing={4} columns={{ lg: 5, md: 3, sm: 1 }}>
        {list[page - 1].map((item) => (
          
          <Grid item key={item.id} lg={1} md={1} sm={1}>
            {
              <CardProductContainer
                id={item.id}
                img={item.galleryImages}
                title={item.name}
                description={item.description}
                categoryList={item.categoryList}
                rating={item.rating}
                numberDiners={item.numberDiners}
              />
            }
          </Grid>
        ))}
      </Grid>
      <Box
        padding={5}
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
