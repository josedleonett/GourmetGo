import React from "react";
import CardCategoryContainer from "./CardCategoryContainer";
import { Grid } from "@mui/material";
import CardDisplay from "../display/CardCategoryDisplay";
import CardGridDisplay from "../display/CardGridDisplay";
import CardProductContainer from "./CardProductContainer";

const CardGridContainer = ({ list, cardType }) => {
  return (
    <Grid container spacing={3} columns={{ lg: 12, md: 12, sm: 1 }}>
      {list.map((item) => (
        <Grid item key={item.id} lg={2} md={4} sm={6}>
          {cardType === "category" ? (
            <CardCategoryContainer
              img={item.img}
              title={item.title}
              description={item.description}
            />
          ) : cardType === "product" ? (
            <CardProductContainer
              img={item.img}
              title={item.title}
              description={item.description}
            />
          ) : (
            "Invalid card grid type"
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGridContainer;
