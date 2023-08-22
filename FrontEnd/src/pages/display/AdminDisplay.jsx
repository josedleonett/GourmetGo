import {
  Autocomplete,
  Box,
  Chip,
  Input,
  TextField,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AdminPanelDrawerContainer from "../../components/container/AdminPanelDrawerContainer";
import AdminPanelBundlesContainer from "../../components/container/AdminPanelBundlesContainer";
import AdminPanelDataGridDisplay, {
  //AdminPanelDataGridLoader,
} from "../../components/display/AdminPanelDataGridDisplay";
import NotFoundContainer from "../container/NotFoundContainer";

export const fakeBundlesIds = [
  "1",
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

const AdminDisplay = ({ sidebarMenu, menuSelected }) => {
  const API_BASE_URL = "http://localhost:8080/v1/";
  const API_BASE_IMAGE_URL = "http://localhost:8080/asset/get-object?key=";

  //COLUMNS DEFINITION:

  const plateDataGridProps = {
    API_BASE_URL: API_BASE_URL + "plate/",
    API_BASE_IMAGE_URL: API_BASE_IMAGE_URL,
    columns: [
      {
        accessor: "image",
        id: "image",
        isFileType: true,
        type: "file",
        //imgPostDir: "image",
        header: "Image",
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                alt="cover"
                width={"90%"}
                loading="lazy"
                src={API_BASE_IMAGE_URL + row.original.image}
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
        enableEditing: false,
        enableSorting: false,
        size: 30,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
      },
      {
        accessorKey: "description",
        header: "Description",
        isMultiline: true,
        size: 140,
      },
      {
        accessorKey: "type",
        header: "Plate type",
        isMultiline: false,
        size: 80,
      },
    ],
  };


  const drinkDataGridProps = {
    API_BASE_URL: API_BASE_URL + "drink/",
    API_BASE_IMAGE_URL: API_BASE_IMAGE_URL,
    columns: [
      {
        accessor: "image",
        id: "image",
        isFileType: true,
        type: "file",
        header: "Image",
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                alt="cover"
                width={"90%"}
                loading="lazy"
                src={API_BASE_IMAGE_URL + row.original.image}
              />
              <span>{renderedCellValue}</span>
            </Box>
          </>
        ),
      },
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 30,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
      },
      {
        accessorKey: "price",
        header: "Price",
        isMultiline: false,
        size: 80,
        type: "number",
      },
    ],
  };

  const categoryDataGridProps = {
    API_BASE_URL: API_BASE_URL + "category/",
    API_BASE_IMAGE_URL: API_BASE_IMAGE_URL,
    columns: [
      {
        accessor: "image",
        id: "image",
        isFileType: true,
        type: "file",
        //imgPostDir: "image",
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
              disabled={row.enableEditing === false}
            />
          );
        },
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                alt="cover"
                width={"90%"}
                loading="lazy"
                src={API_BASE_IMAGE_URL + row.original.image}
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
        enableEditing: false,
        enableSorting: false,
        size: 30,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
      },
      {
        accessorKey: "description",
        header: "Description",
        isMultiline: true,
        size: 140,
      },
      {
        accessorKey: "bundles",
        header: "Bundles",
        isMultiple: true,
        options: fakeBundlesIds,
        enableEditing: false,
        size: 140,
        Cell: ({ renderedCellValue, row }) => (
          <Autocomplete
            disabled
            multiple
            limitTags={5}
            value={renderedCellValue}
            defaultValue={renderedCellValue}
            options={fakeBundlesIds}
            filterSelectedOptions
            //autoComplete
            key={renderedCellValue.id}
            renderInput={(params) => (
              <TextField {...params} key={renderedCellValue.toString()} />
            )}
            renderTags={(value, getTagProps) =>
              renderedCellValue.map((option, index) => (
                <Chip
                  key={index.toString()}
                  variant="filled"
                  label={option}
                  color="secondary"
                />
              ))
            }
          />
        ),
      },
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
            element={
              <AdminPanelDataGridDisplay
                props={plateDataGridProps}
                filter={"starter"}
              />
            }
          />
          <Route
            path="plates/mainCourse"
            element={
              <AdminPanelDataGridDisplay
                props={plateDataGridProps}
                filter={"mainCourse"}
              />
            }
            //FALTA IMPLEMENTAR LOADER DE REACT-ROUTER-DOM
            //loader={AdminPanelDataGridLoader}
          />
          <Route
            path="plates/dessert"
            element={
              <AdminPanelDataGridDisplay
                props={plateDataGridProps}
                filter={"dessert"}
              />
            }
          />
          <Route
            path="drinks"
            element={<AdminPanelDataGridDisplay props={drinkDataGridProps} />}
          />
          <Route
            path="categories"
            element={
              <AdminPanelDataGridDisplay props={categoryDataGridProps} />
            }
          />
          <Route path="/*" element={<NotFoundContainer />} />
        </Routes>
      </Box>
    </>
  );
};

export default AdminDisplay;
