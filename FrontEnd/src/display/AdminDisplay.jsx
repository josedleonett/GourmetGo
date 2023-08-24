import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AdminPanelDrawerContainer from "../../components/container/AdminPanelDrawerContainer";
import AdminPanelBundlesContainer from "../../components/container/AdminPanelBundlesContainer";
import AdminPanelPlatesStarterContainer from "../../components/container/AdminPanelPlatesStarterContainer";
import AdminPanelPlatesMainCourseContainer from "../../components/container/AdminPanelPlatesMainCourseContainer";
import AdminPanelPlatesDessertContainer from "../../components/container/AdminPanelPlatesDessertContainer";
import AdminPanelDrinksContainer from "../../components/container/AdminPanelDrinksContainer";
import AdminPanelCategoriesContainer from "../../components/container/AdminPanelCategoriesContainer";
import NotFoundContainer from "../container/NotFoundContainer";

const AdminDisplay = ({ sidebarMenu, menuSelected }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminPanelDrawerContainer sidebarMenuList={sidebarMenu} />

        <Routes>
          <Route path="bundles" element={<AdminPanelBundlesContainer />} />
          <Route
            path="plates/starter"
            element={<AdminPanelPlatesStarterContainer />}
          />
          <Route
            path="plates/mainCourse"
            element={<AdminPanelPlatesMainCourseContainer />}
          />
          <Route
            path="plates/dessert"
            element={<AdminPanelPlatesDessertContainer />}
          />
          <Route path="drinks" element={<AdminPanelDrinksContainer />} />
          <Route
            path="categories"
            element={<AdminPanelCategoriesContainer />}
          />
          <Route path="/*" element={<NotFoundContainer />} />
        </Routes>
      </Box>
    </>
  );
};

export default AdminDisplay;
