import React from "react";
import HomeDisplay from "../display/HomeDisplay";
import { categories } from "../test/dataApiSample";

const HomeContainer = () => {

  const categoriesFromTest = categories;
  
  
  return <HomeDisplay categories={categoriesFromTest} />;
};

export default HomeContainer;
