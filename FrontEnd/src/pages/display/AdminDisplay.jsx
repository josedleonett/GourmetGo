import {
  Autocomplete,
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AdminPanelDrawerContainer from "../../components/container/AdminPanelDrawerContainer";
import AdminPanelBundlesContainer from "../../components/container/AdminPanelBundlesContainer";
import AdminPanelDataGridDisplay, {
  //AdminPanelDataGridLoader,
} from "../../components/display/AdminPanelDataGridDisplay";
import NotFoundContainer from "../container/NotFoundContainer";
import { BiDish } from "react-icons/bi";
import { RiRestaurant2Line } from "react-icons/ri";
import { GiPieSlice } from "react-icons/gi";
import { MdLocalBar } from "react-icons/md";
import { Delete, Edit } from "@mui/icons-material";

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

  //RENDER DETAIL PANEL:
  const bundlesRenderDetailPanel = ({ row }) => (
    <Container>
      <Container>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <BiDish size="30" />
            </ListItemAvatar>
            <ListItemText
              primary="Starter:"
              secondary={
                <>
                  {row.original.starter &&
                    row.original.starter.map((starterItem) => (
                      <>
                        <Typography
                          key={`starterItemId_${starterItem.id}`}
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {starterItem.name}
                        </Typography>
                        {` — ${starterItem.description}`}
                      </>
                    ))}
                </>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <RiRestaurant2Line size="30" />
            </ListItemAvatar>
            <ListItemText
              primary="Main Course:"
              secondary={
                <>
                  {row.original.mainCourse &&
                    row.original.mainCourse.map((mainCourseItem) => (
                      <>
                        <Typography
                          key={`mainCourseItemId_${mainCourseItem.id}`}
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {mainCourseItem.name}
                        </Typography>
                        {` — ${mainCourseItem.description}`}
                      </>
                    ))}
                </>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <GiPieSlice size="30" />
            </ListItemAvatar>
            <ListItemText
              primary="Dessert:"
              secondary={
                <>
                  {row.original.desserts &&
                    row.original.desserts.map((dessertsItem) => (
                      <>
                        <Typography
                          key={`dessertsItemId_${dessertsItem.id}`}
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {dessertsItem.name}
                        </Typography>
                        {` — ${dessertsItem.description}`}
                      </>
                    ))}
                </>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <MdLocalBar size="30" />
            </ListItemAvatar>
            <ListItemText
              primary="Drinks:"
              secondary={
                <>
                  {row.original.drinks &&
                    row.original.drinks.map((drinksItem) => (
                      <>
                        <Typography
                          key={`drinksItemId_${drinksItem.id}`}
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {drinksItem.name}
                        </Typography>
                        {` — `}
                      </>
                    ))}
                </>
              }
            />
          </ListItem>
        </List>
      </Container>
    </Container>
  );

  //COLUMNS DEFINITION:
  const bundlesDataGridProps = {
    API_BASE_URL: API_BASE_URL + "bundle/",
    API_BASE_IMAGE_URL: API_BASE_IMAGE_URL,
    columns: [
      {
        accessorKey: "image",
        id: "image",
        isFileType: true,
        type: "file",
        header: "Image",
        size: 30,
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {console.log(row)}
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
        accessorKey: "description",
        header: "Description",
        isMultiline: true,
        size: 140,
      },
      // {
      //   accessorKey: "starter[id]",
      //   header: "Starter id",
      //   isMultiple: true,
      //   isMultiline: false,
      //   options: [1,2,5,4],
      //   size: 80,
      // },
      {
        accessorKey: "starter[name]",
        header: "Starter",
        //isMultiple: true,
        isMultiline: false,
        options: ["Caprese Salad",2,5,4],
        size: 80,
      },
      {
        accessorKey: "mainCourse[name]",
        header: "Main Course",
        //isMultiple: true,
        isMultiline: false,
        options: ["Caprese Salad",2,5,4],
        size: 80,
      },
      {
        accessorKey: "desserts[name]",
        header: "Desserts",
        //isMultiple: true,
        isMultiline: false,
        options: ["Caprese Salad",2,5,4],
        size: 80,
      },
      {
        accessorKey: "drinks[name]",
        header: "Drinks",
        //isMultiple: true,
        isMultiline: false,
        options: ["Caprese Salad",2,5,4],
        size: 80,
      },
      {
        accessorKey: "characteristics[id]",
        header: "Characteristics",
        //isMultiple: true,
        isMultiline: false,
        options: ["Caprese Salad",2,5,4],
        size: 80,
      },
      {
        accessorKey: "categories[id]",
        header: "Categories",
        //isMultiple: true,
        isMultiline: false,
        options: ["Caprese Salad",2,5,4],
        size: 80,
      },
      {
        accessorKey: "galleryImages",
        header: "Gallery",
        isMultiline: false,
        type: "file",
        isFileType: true,
        isMultiple: true,
        size: 80,
      },
    ],
  };

  const plateDataGridProps = {
    API_BASE_URL: API_BASE_URL + "plate/",
    API_BASE_IMAGE_URL: API_BASE_IMAGE_URL,
    columns: [
      {
        accessor: "image",
        id: "image",
        isFileType: true,
        type: "file",
        header: "Image",
        size: 30,
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
        size: 30,
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
        size: 30,
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
        //isMultiple: true,
        //options: fakeBundlesIds,
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
          <Route
            path="bundles"
            element={
              <AdminPanelDataGridDisplay
                props={bundlesDataGridProps}
                renderDetailPanel={bundlesRenderDetailPanel}
              />
            }
          />
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
