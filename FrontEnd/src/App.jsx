import { Outlet } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./container/HeaderContainer";
import FooterContainer from "./container/FooterContainer";

function App() {
  return (
    <>
      <HeaderContainer />
      <Outlet />
      <FooterContainer />
    </>
  );
}

export default App;
