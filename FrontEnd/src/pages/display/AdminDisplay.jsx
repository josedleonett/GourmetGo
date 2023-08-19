import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AdminPanelDrawerContainer from "../../components/container/AdminPanelDrawerContainer";
import AdminPanelBundlesContainer from "../../components/container/AdminPanelBundlesContainer";
import AdminPanelPlatesStarterContainer from "../../components/container/AdminPanelPlatesStarterContainer";
import AdminPanelPlatesMainCourseContainer from "../../components/container/AdminPanelPlatesMainCourseContainer";
import AdminPanelPlatesDessertContainer from "../../components/container/AdminPanelPlatesDessertContainer";
import AdminPanelDrinksContainer from "../../components/container/AdminPanelDrinksContainer";
import AdminPanelCategoriesContainer from "../../components/container/AdminPanelCategoriesContainer";
import AdminPanelDataGridDisplay, { multiSelectColumn } from "../../components/display/AdminPanelDataGridDisplay";
import NotFoundContainer from "../container/NotFoundContainer";
import { useState } from "react";

const AdminDisplay = ({ sidebarMenu, menuSelected }) => {
  const API_BASE_IMAGE_URL = "http://localhost:8080/asset/get-object?key=";


  const dataGridPropsCategory = {
    API_BASE_URL: "http://localhost:8080/v1/category/",
    API_BASE_IMAGE_URL: "http://localhost:8080/asset/get-object?key=",
    modal: {
      initialValues: { name: "", price: 0, image: null },
      formInputs: [
        {
          name: "name",
          type: "text",
          formLabel: "Name",
          isRequired: true,
        },
        {
          name: "price",
          type: "number",
          formLabel: "Price",
        },
        {
          name: "categoryImage",
          type: "file",
          formLabel: "Image",
          isMultiple: false,
          accept: "image/*",
        },
      ],
    },
    dataGridColumns: [
      {
        field: "img",
        headerName: "Image",
        type: "image",
        width: 80,
        renderCell: (params) => (
          <Box
            component="img"
            height="90%"
            src={API_BASE_IMAGE_URL + params.value}
          />
        ),
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        type: "text",
        width: 400,
        align: "left",
        headerAlign: "left",
        editable: true,
      },
      // {
      //   field: "bundles",
      //   headerName: "Bundles",
      //   type: "multiSelect",
      //   width: 400,
      //   align: "left",
      //   headerAlign: "left",
      //   editable: true,
      // },
      {
        field: "bundles",
        headerName: "Bundles",
        type: "number",
        width: 500,
        renderCell: multiSelectColumn,
        editable: true,
      },
    ],
  };


  const dataGridPropsDrinks = {
    API_BASE_URL: "http://localhost:8080/v1/drink/",
    API_BASE_IMAGE_URL: "http://localhost:8080/asset/get-object?key=",
    modal: {
      initialValues: { name: "", price: 0, image: null },
      formInputs: [
        {
          name: "name",
          type: "text",
          formLabel: "Name",
          isRequired: true,
        },
        {
          name: "price",
          type: "number",
          formLabel: "Price",
        },
        {
          name: "image",
          type: "file",
          formLabel: "Image",
          isMultiple: false,
          accept: "image/*"
        },
      ]
    },
  };

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
            element={
              <AdminPanelDataGridDisplay props={dataGridPropsCategory} />
            }
          />
          <Route path="/*" element={<NotFoundContainer />} />
        </Routes>
      </Box>
    </>
  );
};

export default AdminDisplay;
