import { useCallback, useEffect, useMemo, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
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
  AddAPhoto,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

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

const AdminPanelDataGridDisplay = ({
  props,
  filter,
  renderDetailPanel,
  allowEditModal,
  allowCreateModal,
}) => {
  const API_BASE_URL = props.API_BASE_URL;
  const API_BASE_IMAGE_URL = props.API_BASE_IMAGE_URL;
  const columns = useMemo(() => props.columns);
  const [initialState, setInitialState] = useState(props.initialState);
  const [data, setData] = useState([]);

  const [isAllowEditModal, setIsAllowEditModal] = useState(true)
  const [isAllowCreateModal, setIsAllowCreateModal] = useState(true)
  const [rowToUpdate, setRowToUpdate] = useState({});
  const [rowToDelete, setRowToDelete] = useState(-1);
  const [validationErrors, setValidationErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isFormDeleting, setIsFormDeleting] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setIsRefetching(true);
    setIsAllowCreateModal(props.allowCreateModal);
    setIsAllowEditModal(props.allowEditModal);

    getApiData();
  }, [location.pathname, props]);

  const getApiData = async () => {
    !data.length ? setIsLoading(true) : setIsRefetching(true);

    try {
      const response = await axios.get(API_BASE_URL);

      if (filter != undefined) {
        const dataFiltered = response.data.filter(
          (item) => item.hasOwnProperty("type") && item.type === filter
        );
        setData(dataFiltered);
      } else {
        setData(response.data);
      }
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
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(API_BASE_URL + "create", formData);
      const responseCode = response.status;
      return responseCode;
    } catch (error) {
      const responseCode = error.response;
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
        getApiData();
      }
      return responseCode;
    } catch (error) {
      const responseCode = error.response;
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
    (row) => {
      setIsDeleteModalOpen(true);
      setRowToDelete(row.original.id);
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
        }}
        initialState={initialState}
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
          <>
            {isAllowCreateModal === false ? (
              <span />
            ) : (
              <Button
                color="primary"
                onClick={() => setIsModalOpen(true)}
                variant="contained"
                startIcon={<Add />}
              >
                Create new item
              </Button>
            )}
          </>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {isAllowEditModal === false ? (
              <span />
            ) : (
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => handleUpdateRow(row.original)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            )}

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
        onClose={() => {
          setIsModalOpen(false);
          setRowToUpdate({});
        }}
        rowToUpdate={rowToUpdate}
        columns={columns}
        onSubmitCreateHandler={handleCreateNewRow}
        onSubmitUpdateHandler={updateApiData}
        isLoading={isLoading}
        API_BASE_IMAGE_URL={API_BASE_IMAGE_URL}
      />

      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setRowToDelete(-1);
        }}
        rowToDelete={rowToDelete}
        onSubmitDeleteHandler={deleteApiData}
        data={data}
        setData={setData}
      />
    </>
  );
};

export const CreateUpdateItemModal = ({
  open,
  rowToUpdate,
  columns,
  onClose,
  onSubmitCreateHandler,
  onSubmitUpdateHandler,
  isLoading,
  API_BASE_IMAGE_URL,
}) => {
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  const formik = useFormik({
    initialValues: rowToUpdate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsFormSending(true);
      alert(JSON.stringify(values, null, 2));

      let responseCode = -1;
      let responseStatusProps = { ...responseStatus };

      if (isRowToUpdateEmpty) {
        const convertedToArrayPlates = convertPropertiesToArray(values);
        if (convertedToArrayPlates !== null) {
          responseCode = await onSubmitCreateHandler(convertedToArrayPlates);
        }
      } else {
        const modifiedProperties = getModifiedProperties(values, rowToUpdate);

        if (modifiedProperties === null) {
          responseStatusProps = {
            ...responseStatusProps,
            status: "info",
            message: "Nothing was modified",
            messageTitle: "Info",
          };
        } else {
          const convertedToArrayPlates =
            convertPropertiesToArray(modifiedProperties);
          if (convertedToArrayPlates !== null) {
            responseCode = await onSubmitUpdateHandler(
              values.id,
              convertedToArrayPlates
            );
          }
        }
      }

      setIsFormSubmitted(true);

      if (responseCode === -1) {
        responseStatusProps = {
          ...responseStatusProps,
          status: "info",
          message: "Nothing was modified",
          messageTitle: "Info",
        };
      } else if (responseCode === 201 || responseCode === 204) {
        responseStatusProps = {
          ...responseStatusProps,
          status: "success",
          message: "Item added successfully!",
          messageTitle: "Success",
        };
      } else {
        responseStatusProps = {
          ...responseStatusProps,
          status: "error",
          message: "Oops! An error occurred while processing the item.",
          messageTitle: "Error",
        };
      }

      if (responseCode === -1 || responseCode === 201 || responseCode === 204) {
        setTimeout(() => {
          onCloseHandler();
        }, 1500);
      }

      setResponseStatus(responseStatusProps);
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

    if (Object.keys(modifiedProperties).length == 0) {
      return null;
    }

    if ("img" in rowToUpdate) {
      delete rowToUpdate.img;
    }

    return modifiedProperties;
  };

  function convertPropertiesToArray(inputObject) {
    const outputObject = { ...inputObject };

    const propertiesToConvert = [
      "starter",
      "mainCourse",
      "desserts",
      "drinks",
      "characteristics",
      "categories",
    ];

    for (const propertyName in outputObject) {
      if (outputObject[propertyName] instanceof FileList) {
        outputObject[propertyName] = Array.from(outputObject[propertyName]);
      } else if (
        propertiesToConvert.includes(propertyName) &&
        outputObject[propertyName] &&
        typeof outputObject[propertyName] === "object"
      ) {
        if (outputObject[propertyName].name != undefined ) {
          outputObject[propertyName] = [outputObject[propertyName].name];
        } else {
          outputObject[propertyName] = [outputObject[propertyName].id];
        }
      }
    }

    return outputObject;
  }

  const onCloseHandler = () => {
    formik.resetForm();
    onClose();
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 5000);
  };

  const getImageUrl = (value) => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    } else {
      return API_BASE_IMAGE_URL + value;
    }
  };

  return (
    <>
      <Dialog open={open} maxWidth="xl">
        <DialogTitle textAlign="center">
          {isRowToUpdateEmpty ? "Create" : "Update"} New Item
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "700px", sm: "700px", md: "700px" },
                maxWidth: { xs: "700px", sm: "700px", md: "700px" },
                gap: "1.5rem",
              }}
            >
              {columns.map((column, index) => (
                <>
                  {column.isFileType ? (
                    <>
                      <Typography>{column.accessorKey}</Typography>
                      <Button
                        component="label"
                        color="primary"
                        variant="contained"
                        startIcon={<AddAPhoto />}
                      >
                        Upload image
                        <input
                          hidden
                          id={column.accessorKey}
                          type="file"
                          key={column.accessorKey}
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
                          multiple={column.isMultiple}
                        />
                      </Button>
                      {formik.values[column.accessorKey] && (
                        <Box maxHeight={150} maxWidth={150}>
                          {!isImageLoaded && (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height="100%"
                            />
                          )}
                          <img
                            src={getImageUrl(formik.values[column.accessorKey])}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onLoad={() => {
                              setIsImageLoaded(true);
                            }}
                          />
                        </Box>
                      )}
                      <Typography>
                        {formik.values[column.accessorKey] &&
                          formik.values[column.accessorKey].name}
                      </Typography>
                    </>
                  ) : column.isMultiple ? (
                    <>
                      <Autocomplete
                        multiple
                        autoComplete
                        key={index}
                        defaultValue={
                          formik.values[column.accessorKey]
                          &&
                          formik.values[column.accessorKey.replace(/\[.*\]/g, "")]?.map((item) => item.name)
                        }
                        filterSelectedOptions
                        options={column.options}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={
                              formik.values[column.accessorKey]
                              &&
                              formik.values[column.accessorKey.replace(/\[.*\]/g, "")]?.map((item) => item.name)
                            }
                            key={`input-${index}`}
                            name={column.header}
                            label={column.header}
                            disabled={
                              isFormSending && column.enableEditing === false
                            }
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                            {...getTagProps({ index })}
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
            variant="contained"
            onClick={formik.handleSubmit}
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

const DeleteItemModal = ({
  isOpen,
  onClose,
  rowToDelete,
  onSubmitDeleteHandler,
  data,
  setData
}) => {
  const [isFormDeleting, setIsFormDeleting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState({
    status: null,
    message: "",
    messageTitle: "",
  });
  const submitButtonLabel = isFormDeleting ? "DELETING..." : "DELETE";

  const onConfirmHandler = async () => {
    setIsFormDeleting(true);
    const responseCode = await onSubmitDeleteHandler(rowToDelete);

    if (responseCode === 204) {
      const updatedData = data.filter((item) => item.id !== rowToDelete);
      setData(updatedData);

      setResponseStatus({
        ...responseStatus,
        status: "success",
        message: "Item was deleted successfully",
        messageTitle: "Delete",
      });

      setIsFormSubmitted(true);

      onClose();

      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 3000);
    }
    setIsFormDeleting(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>This action cannot be undone</AlertTitle>
            Are you sure you want to delete this item?
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button onClick={onClose} disabled={isFormDeleting}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={onConfirmHandler}
            startIcon={
              isFormDeleting ? <CircularProgress size={24} /> : <Delete />
            }
            disabled={isFormDeleting}
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
