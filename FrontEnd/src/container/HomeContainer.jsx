import React from "react";
import HomeDisplay from "../display/HomeDisplay";
import { category } from "../test/dataApiSample";

const HomeContainer = () => {

  const categoryFromTest = category;
  
  
  return <HomeDisplay category={categoryFromTest} />;
};

export default HomeContainer;
