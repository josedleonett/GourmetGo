import { Autocomplete, Box, Chip, Input, TextField } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AdminPanelDrawerContainer from "../../components/container/AdminPanelDrawerContainer";
import AdminPanelBundlesContainer from "../../components/container/AdminPanelBundlesContainer";
import AdminPanelPlatesStarterContainer from "../../components/container/AdminPanelPlatesStarterContainer";
import AdminPanelPlatesMainCourseContainer from "../../components/container/AdminPanelPlatesMainCourseContainer";
import AdminPanelPlatesDessertContainer from "../../components/container/AdminPanelPlatesDessertContainer";
import AdminPanelDrinksContainer from "../../components/container/AdminPanelDrinksContainer";
import AdminPanelCategoriesContainer from "../../components/container/AdminPanelCategoriesContainer";
import AdminPanelDataGridDisplay from "../../components/display/AdminPanelDataGridDisplay";
import NotFoundContainer from "../container/NotFoundContainer";
import { useState } from "react";

const AdminDisplay = ({ sidebarMenu, menuSelected }) => {
  const API_BASE_URL = "http://localhost:8080/v1/"
  const API_BASE_IMAGE_URL = "http://localhost:8080/asset/get-object?key=";


  // const dataGridPropsCategory = {
  //   API_BASE_URL: "http://localhost:8080/v1/category/",
  //   API_BASE_IMAGE_URL: "http://localhost:8080/asset/get-object?key=",
  //   modal: {
  //     initialValues: { name: "", price: 0, image: null },
  //     formInputs: [
  //       {
  //         name: "name",
  //         type: "text",
  //         formLabel: "Name",
  //         isRequired: true,
  //       },
  //       {
  //         name: "price",
  //         type: "number",
  //         formLabel: "Price",
  //       },
  //       {
  //         name: "categoryImage",
  //         type: "file",
  //         formLabel: "Image",
  //         isMultiple: false,
  //         accept: "image/*",
  //       },
  //     ],
  //   },
  //   dataGridColumns: [
  //     {
  //       field: "img",
  //       headerName: "Image",
  //       type: "image",
  //       width: 80,
  //       renderCell: (params) => (
  //         <Box
  //           component="img"
  //           height="90%"
  //           src={API_BASE_IMAGE_URL + params.value}
  //         />
  //       ),
  //     },
  //     {
  //       field: "name",
  //       headerName: "Name",
  //       minWidth: 400,
  //       editable: true,
  //     },
  //     {
  //       field: "description",
  //       headerName: "Description",
  //       type: "text",
  //       width: 400,
  //       align: "left",
  //       headerAlign: "left",
  //       editable: true,
  //     },
  //     // {
  //     //   field: "bundles",
  //     //   headerName: "Bundles",
  //     //   type: "multiSelect",
  //     //   width: 400,
  //     //   align: "left",
  //     //   headerAlign: "left",
  //     //   editable: true,
  //     // },
  //     {
  //       field: "bundles",
  //       headerName: "Bundles",
  //       type: "number",
  //       width: 500,
  //       renderCell: multiSelectColumn,
  //       editable: true,
  //     },
  //   ],
  // };


  // const dataGridPropsDrinks = {
  //   API_BASE_URL: "http://localhost:8080/v1/drink/",
  //   API_BASE_IMAGE_URL: "http://localhost:8080/asset/get-object?key=",
  //   modal: {
  //     initialValues: { name: "", price: 0, image: null },
  //     formInputs: [
  //       {
  //         name: "name",
  //         type: "text",
  //         formLabel: "Name",
  //         isRequired: true,
  //       },
  //       {
  //         name: "price",
  //         type: "number",
  //         formLabel: "Price",
  //       },
  //       {
  //         name: "image",
  //         type: "file",
  //         formLabel: "Image",
  //         isMultiple: false,
  //         accept: "image/*"
  //       },
  //     ]
  //   },
  // };


  const categoryDataGridProps = {
    API_BASE_URL: API_BASE_URL + "category/",
    API_BASE_IMAGE_URL: API_BASE_IMAGE_URL,
    columns: [
      {
        accessor: "img",
        id: "img",
        isFileType: true,
        imgPostDir: "categoryImage",
        header: "Image",
        size: 50,
        Edit: ({ row }) => {
          return (
            <Input
              id={row.accessorKey}
              type="file"
              key={row.accessorKey}
              label={row.header}
              name={row.categoryImg || row.accessorKey}
              onChange={(e) =>
                formik.setFieldValue(
                  row.imgPostDir || row.accessor,
                  row.isMultiple
                    ? e.currentTarget.files
                    : e.currentTarget.files[0]
                )
              }
              disabled={ row.enableEditing === false}
            />
          );
        },
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          type: "file",
          //...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {/* {console.log(row.original.img)} */}
              <img
                alt="cover"
                height={30}
                src={API_BASE_IMAGE_URL + row.original.img}
                loading="lazy"
              />
              {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
              <span>{renderedCellValue}</span>
            </Box>
          </>
        ),
      },
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          disable: true,
          //...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          //...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          //...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "bundles",
        header: "Bundles",
        Edit: ({ row }) => {
          return (
            <Autocomplete
              multiple
              defaultValue={row.value}
              options={[11, 2, 1, 5]}
              autoComplete
              renderInput={(params) => (
                <TextField {...params} label="Bundles" />
              )}
              onChange={(event, value) => {
                row._valuesCache["bundles"] = value;
              }}
            />
          );
        },
      },
      // {
      //   accessorKey: 'state',
      //   header: 'State',
      //   muiTableBodyCellEditTextFieldProps: {
      //     select: true, //change to select for a dropdown
      //     children: states.map((state) => (
      //       <MenuItem key={state} value={state}>
      //         {state}
      //       </MenuItem>
      //     )),
      //   },
      // },
    ],
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
              <AdminPanelDataGridDisplay 
              props={categoryDataGridProps} 
              />
            }
          />
          <Route path="/*" element={<NotFoundContainer />} />
        </Routes>
      </Box>
    </>
  );
};

export default AdminDisplay;
