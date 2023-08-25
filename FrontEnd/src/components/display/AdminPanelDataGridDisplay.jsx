import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { useFormik } from "formik";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Delete,
  Edit,
  Add,
  Save,
  Cancel,
  Error,
  Check,
  Label,
} from "@mui/icons-material";
import { BiDish } from "react-icons/bi";
import { RiRestaurant2Line } from "react-icons/ri";
import { GiPieSlice } from "react-icons/gi";
import { MdLocalBar } from "react-icons/md";

//FALTA IMPLEMENTAR LOADER DE REACT-ROUTER-DOM
// export const AdminPanelDataGridLoader = async (API_BASE_URL, filter) => {
//   !data.length ? setIsLoading(true) : setIsRefetching(true);

//   try {
//     const response = await axios.get(API_BASE_URL);

//     if (filter !== undefined) {
//       const dataFiltered = response.data.filter(
//         (item) => item.hasOwnProperty("type") && item.type === filter
//       );
//       setData(dataFiltered);
//     } else {
//       setData(response.data);
//     }
//     console.log(response.data);
//   } catch (error) {
//     setIsError(true);
//     console.error("Error fetching data:", error);
//   }

//   setIsError(false);
//   setIsLoading(false);
//   setIsRefetching(false);

//   return;
// };


const AdminPanelDataGridDisplay = ({ props, filter, renderDetailPanel }) => {
  const API_BASE_URL = props.API_BASE_URL;
  const API_BASE_IMAGE_URL = props.API_BASE_IMAGE_URL;
  const columns = useMemo(() => props.columns);

  const [data, setData] = useState([]);
  const [rowToUpdate, setRowToUpdate] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  console.log(props);

  useEffect(() => {
    setIsLoading(true);
    setIsRefetching(true);

    getApiData();
  }, [props]);

  const getApiData = async () => {
    !data.length ? setIsLoading(true) : setIsRefetching(true);

    try {
      const response = await axios.get(API_BASE_URL);

      console.log(response.data);

      if (filter != undefined) {
        const dataFiltered = response.data.filter(
          (item) => item.hasOwnProperty("type") && item.type === filter
        );
        setData(dataFiltered);
      } else {
        setData(response.data);
      }
      //console.log(response.data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching data:", error);
    }

    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };

  const postApiData = async (propertiesToCreate) => {

    try {
      const formData = new FormData();

      for (const key in propertiesToCreate) {
        if (key === "galleryImages") {
          propertiesToCreate.galleryImages.forEach((image) => {
            formData.append("galleryImages", image);
          });
          continue;
        }
        if (propertiesToCreate.hasOwnProperty(key)) {
          formData.append(key, propertiesToCreate[key]);
        }
      }

      //CHECK OUTPUT
      for (const [key, value] of formData.entries()) {
        console.log("POSTING");
        console.log(key, value);
        console.log("POSTING");
      }
      //CHECK OUTPUT

      const response = await axios.post(API_BASE_URL + "create", formData);
      const responseCode = response.status;
      return responseCode;
    } catch (error) {
      const responseCode = error.response.status;
      console.error("Error create data:", error.response);
      return responseCode;
    }
  };

  const updateApiData = async (targetIdToUpdate, propertiesToUpdate = {}) => {
    try {
      const formData = new FormData();

      for (const key in propertiesToUpdate) {
        if (propertiesToUpdate.hasOwnProperty(key)) {

          formData.append(key, propertiesToUpdate[key]);
        }
      }

      const response = await axios.patch(
        API_BASE_URL + targetIdToUpdate,
        formData
      );
      const responseCode = response.status;
      if (
        responseCode === 200 ||
        responseCode === 201 ||
        responseCode === 204
      ) {
        console.log(responseCode);
        getApiData();
      }
      return responseCode;
    } catch (error) {
      const responseCode = error.response.status;
      console.error("Error Update data:", error.response);
      return responseCode;
    }
  };

  const deleteApiData = async (targetIdToDelete) => {
    try {
      const response = await axios.delete(API_BASE_URL + targetIdToDelete);
      const responseCode = response.status;
      return responseCode;
    } catch (error) {
      const responseCode = error.response.status;
      console.error("Error delete data:", error.response);
      return responseCode;
    }
  };

  const handleCreateNewRow = (values) => {
    data.push(values);
    setData([...data]);

    const responseCode = postApiData(values);
    if (responseCode === 201) {
      getApiData();
    }

    return responseCode;
  };

  const handleUpdateRow = (values) => {
    setRowToUpdate(values);
    setIsModalOpen(true);
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!confirm(`Are you sure you want to delete item?}`)) {
        return;
      }

      const responseCode = await deleteApiData(row.original.id);

      if (responseCode === 204) {
      }
      data.splice(row.index, 1);
      setData([...data]);
    },
    [data]
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={data}
        editingMode="modal"
        enableColumnOrdering
        enableStickyHeader
        enableEditing
        //enableRowDragging
        //onEditingRowSave={handleSaveRowEdits}
        //onEditingRowCancel={handleCancelRowEdits}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        state={{
          isLoading,
          showProgressBars: isRefetching,
          showAlertBanner: isError,
          columnVisibility: { id: false, galleryImages: false },
        }}
        muiTableContainerProps={({ table }) => ({
          sx: {
            height: `calc(100% - ${table.refs.topToolbarRef.current?.offsetHeight}px - ${table.refs.bottomToolbarRef.current?.offsetHeight}px)`,
          },
        })}
        muiTablePaperProps={{
          sx: {
            height: "100%",
            width: "100%",
          },
        }}
        renderDetailPanel={renderDetailPanel}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            startIcon={<Add />}
          >
            Create new item
          </Button>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => handleUpdateRow(row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      <CreateUpdateItemModal
        open={isModalOpen || isModalOpen}
        rowToUpdate={rowToUpdate}
        columns={columns}
        onClose={() => {
          setIsModalOpen(false);
          setRowToUpdate({});
        }}
        onSubmitCreateHandler={handleCreateNewRow}
        onSubmitUpdateHandler={updateApiData}
        isLoading={isLoading}
      />
    </>
  );
};

//MODAL
export const CreateUpdateItemModal = ({
  open,
  rowToUpdate,
  columns,
  onClose,
  onSubmitCreateHandler,
  onSubmitUpdateHandler,
  isLoading,
}) => {
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const isRowToUpdateEmpty = Object.keys(rowToUpdate).length === 0;
  const [responseStatus, setResponseStatus] = useState({
    status: null,
    message: "",
    messageTitle: "",
  });
  const submitButtonLabel = isFormSending
    ? isRowToUpdateEmpty
      ? "SAVING..."
      : "UPDATING..."
    : isRowToUpdateEmpty
    ? "SAVE"
    : "UPDATE";

  console.log(rowToUpdate);

  const formik = useFormik({
    initialValues: rowToUpdate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsFormSending(true);
      //alert(JSON.stringify(values, null, 2));

      let responseCode = -1;
      if (isRowToUpdateEmpty) {
        const convertedToArrayPlates = convertPropertiesToArray(values);
        console.log(convertedToArrayPlates);
        responseCode = await onSubmitCreateHandler(convertedToArrayPlates);
      } else {
        const modifiedProperties = getModifiedProperties(values, rowToUpdate);
        console.log(modifiedProperties);
        const convertedToArrayPlates =
          convertPropertiesToArray(modifiedProperties);
        console.log(convertedToArrayPlates);

        if (convertedToArrayPlates != null) {
          responseCode = await onSubmitUpdateHandler(
            values.id,
            convertedToArrayPlates
          );
        } else {
          onCloseHandler();
        }
      }

      setIsFormSubmitted(true);
      console.log(responseCode);

      if (responseCode === -1) {
        setResponseStatus({
          status: "info",
          message: "Anything was modified",
          messageTitle: "Info",
        });
      } else if (responseCode === 201 || responseCode === 204) {
        setResponseStatus({
          ...responseStatus,
          status: "success",
          message: "Item added successfully!.",
          messageTitle: "Success",
        });
        setTimeout(() => {
          onCloseHandler();
        }, 1500);
      } else {
        setResponseStatus({
          ...responseStatus,
          status: "error",
          message: "Oops! An error occurred while procesing the item.",
          messageTitle: "Error",
        });
      }

      setIsFormSending(false);
    },
  });

  const getModifiedProperties = (newRow = {}, oldRow = {}) => {
    const modifiedProperties = {};

    for (const key in newRow) {
      if (newRow.hasOwnProperty(key) && oldRow.hasOwnProperty(key)) {
        if (newRow[key] !== oldRow[key]) {
          modifiedProperties[key] = newRow[key];
        }
      }
    }

    if (Object.keys(modifiedProperties).length === 0) {
      return null;
    }

    if ("img" in rowToUpdate) {
      delete rowToUpdate.img;
    }

    return modifiedProperties;
  };

  function convertPropertiesToArray(inputObject) {
    const outputObject = { ...inputObject };

    if (outputObject.starter && typeof outputObject.starter === "object") {
      outputObject.starter = [outputObject.starter.name];
    }

    if (
      outputObject.mainCourse &&
      typeof outputObject.mainCourse === "object"
    ) {
      outputObject.mainCourse = [outputObject.mainCourse.name];
    }

    if (outputObject.desserts && typeof outputObject.desserts === "object") {
      outputObject.desserts = [outputObject.desserts.name];
    }

    if (outputObject.drinks && typeof outputObject.drinks === "object") {
      outputObject.drinks = [outputObject.drinks.name];
    }

    if (
      outputObject.characteristics &&
      typeof outputObject.drinks === "object"
    ) {
      outputObject.characteristics = [outputObject.characteristics.id];
    }

    if (
      outputObject.categories &&
      typeof outputObject.drinks === "object"
    ) {
      outputObject.categories = [outputObject.categories.id];
    }

    if (
      outputObject.galleryImages &&
      outputObject.galleryImages instanceof FileList
    ) {
      outputObject.galleryImages = Array.from(outputObject.galleryImages);
    }

    return outputObject;
  }

  const onCloseHandler = () => {
    formik.resetForm();
    onClose();
    setIsFormSending(false);
    setTimeout(() => {
      // setResponseStatus({
      //   ...responseStatus,
      //   status: null,
      //   message: "",
      //   messageTitle: "",
      // });
      setIsFormSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle textAlign="center">
          {isRowToUpdateEmpty ? "Create" : "Update"} New Item
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
              }}
            >
              {columns.map((column, index) => (
                <>
                  {column.isFileType ? (
                    <>
                      <Typography>{column.accessorKey}</Typography>
                      <Input
                        id={column.accessorKey}
                        type="file"
                        key={column.accessorKey}
                        label={column.header}
                        name={column.categoryImg || column.accessorKey}
                        onChange={(e) =>
                          formik.setFieldValue(
                            column.accessorKey,
                            column.isMultiple === true
                              ? e.currentTarget.files
                              : e.currentTarget.files[0]
                          )
                        }
                        disabled={
                          isFormSending && column.enableEditing === false
                        }
                        inputProps={{
                          multiple: column.isMultiple,
                        }}
                      />
                    </>
                  ) : column.isMultiple ? (
                    <>
                      <Autocomplete
                        multiple
                        autoComplete
                        //id={column.accessorKey}
                        key={index}
                        value={formik.values[column.accessorKey] || []}
                        //defaultValue={formik.values[column.accessorKey] || []}
                        defaultValue={[1, 2, 3, 4, 5, 6]}
                        filterSelectedOptions
                        options={column.options}
                        renderInput={(params) => (
                          <TextField
                            key={`input-${index}`}
                            name={column.header}
                            label={column.header}
                            disabled={
                              isFormSending && column.enableEditing === false
                            }
                            {...params}
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              key={`chip-${index}`}
                              variant="filled"
                              label={option}
                              color="secondary"
                            />
                          ))
                        }
                        onChange={(event, newValue) => {
                          formik.setFieldValue(column.accessorKey, newValue);
                        }}
                        disabled={
                          isFormSending || column.enableEditing === false
                        }
                      />
                    </>
                  ) : (
                    <TextField
                      key={index}
                      label={column.header}
                      name={column.accessorKey}
                      value={formik.values[column.accessorKey]}
                      onChange={formik.handleChange}
                      multiline={column.isMultiline}
                      inputProps={{
                        disabled:
                          isFormSending ||
                          column.enableEditing === false ||
                          false,
                      }}
                    />
                  )}
                </>
              ))}
            </Stack>
          </form>

          <Toolbar />
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button type="reset" onClick={onCloseHandler} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            onClick={formik.handleSubmit}
            variant="contained"
            startIcon={
              isFormSending ? (
                <CircularProgress size={24} />
              ) : isRowToUpdateEmpty ? (
                <Save />
              ) : (
                <Edit />
              )
            }
            disabled={isFormSending}
          >
            {submitButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={isFormSubmitted}>
        <Alert
          severity={responseStatus.status}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() => setIsFormSubmitted(false)}
        >
          <AlertTitle>{responseStatus.messageTitle}</AlertTitle>
          {responseStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminPanelDataGridDisplay;
