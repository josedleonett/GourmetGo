import React from "react";
import HeaderDisplay from "../display/HeaderDisplay";

const HeaderContainer = () => {
  const accessToken = localStorage.getItem("accessToken");

  return <HeaderDisplay hasAccessToken={accessToken !== null} />;
};

export default HeaderContainer;
