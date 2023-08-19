import { Outlet } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./components/container/HeaderContainer";
import FooterContainer from "./components/container/FooterContainer";

function App() {
  return (
    <>
      <HeaderContainer />
      <Outlet/>
      <FooterContainer />
    </>
  );
}

export default App;
