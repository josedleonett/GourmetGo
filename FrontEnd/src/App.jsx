import { Outlet } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./container/HeaderContainer";
import HomeContainer from "./container/HomeContainer";
import FooterContainer from "./container/FooterContainer";


function App() {
  return (
    <>
      <HeaderContainer />
      <HomeContainer/>
    </>
  );
}

export default App;
