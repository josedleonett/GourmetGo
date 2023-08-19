import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  useGridApiContext,
} from "@mui/x-data-grid";
import { CameraAlt, Create, DeleteForever } from "@mui/icons-material";
import {
  CircularProgress,
  FormLabel,
  Input,
  Modal,
  Stack,
  Toolbar,
  Typography, IconButton, LinearProgress, Autocomplete, TextField,
} from "@mui/material";

export default function AdminPanelDataGridDisplay({ props }) {
  const API_BASE_URL = props.API_BASE_URL;
  const API_BASE_IMAGE_URL = props.API_BASE_IMAGE_URL;
  const modalFormInputs = props.modal.formInputs;
  const dataGridColumns = props.dataGridColumns;

  function EditToolbar(props) {
    const { apiDataCreate } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
      setIsModalOpen(false);
      setIsFormSubmitted(false);
      setIsResponseSuccess(false);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isResponseSuccess, setIsResponseSuccess] = useState(false);

    const formik = useFormik({
      initialValues: {},
      onSubmit: async (values) => {
        setIsLoading(true);
        alert(JSON.stringify(values, null, 2));
        console.log(values);
        const responseCode = await apiDataCreate(values);

        console.log(responseCode + " codigo respuesta");
        setIsFormSubmitted(true);

        if (responseCode === 201) {
          setIsResponseSuccess(true);
        } else {
          setIsResponseSuccess(false);
        }

        setIsLoading(false);
      },
    });

    return (
      <GridToolbarContainer>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openModal}
        >
          Add new
        </Button>
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40vw",
              minWidth: "400px",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" mb={1}>
                <Create /> Add new item:
              </Typography>
              <IconButton aria-label="Close" onClick={closeModal}>
                <CancelIcon />
              </IconButton>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Stack gap={3}>
                {modalFormInputs.map((input, index) => (
                  <Stack key={index}>
                    <FormLabel>{input.formLabel}</FormLabel>
                    <Input
                      id={input.name}
                      name={input.name}
                      type={input.type}
                      onChange={
                        input.type === "file"
                          ? (event) =>
                              formik.setFieldValue(
                                input.name,
                                input.isMultiple
                                  ? event.currentTarget.files
                                  : event.currentTarget.files[0]
                              )
                          : formik.handleChange
                      }
                      disabled={isLoading}
                      required={input.isRequired}
                      inputProps={{
                        multiple: input.isMultiple,
                        accept: input.accept,
                      }}
                    />
                  </Stack>
                ))}
                <Box>
                  <Toolbar />
                  {isFormSubmitted && !isResponseSuccess && (
                    <Typography variant="body1" color="error">
                      An was error occurred
                    </Typography>
                  )}
                  {isResponseSuccess && (
                    <Typography variant="body1" color="initial">
                      Item was saved successfully
                    </Typography>
                  )}
                </Box>
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    startIcon={
                      isLoading ? <CircularProgress size={24} /> : <SaveIcon />
                    }
                  >
                    {isLoading ? "SAVING..." : "SAVE"}
                  </Button>

                  <Button
                    type="reset"
                    variant="contained"
                    color="secondary"
                    startIcon={<CancelIcon />}
                    onClick={closeModal}
                  >
                    CANCEL
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Modal>
      </GridToolbarContainer>
    );
  }

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    apiDataGet();
  }, []);

  const apiDataGet = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const apiDataCreate = async (propertiesToCreate) => {
    try {
      const formData = new FormData();

      for (const key in propertiesToCreate) {
        if (propertiesToCreate.hasOwnProperty(key)) {
          formData.append(key, propertiesToCreate[key]);
        }
      }

      const response = await axios.post(API_BASE_URL + "create", formData);
      const responseCode = response.status;
      apiDataGet();

      return responseCode;
    } catch (error) {
      const responseCode = error.response.status;
      console.error("Error create data:", error);

      return responseCode;
    }
  };

  const apiDataUpdate = async (targetToUpdateId, propertiesToUpdate = {}) => {
    try {
      const formData = new FormData();

      for (const key in propertiesToUpdate) {
        if (propertiesToUpdate.hasOwnProperty(key)) {
          formData.append(key, propertiesToUpdate[key]);
        }
      }
      await axios.patch(API_BASE_URL + targetToUpdateId, formData);
      apiDataGet();

      console.log(formData);
    } catch (error) {
      console.error("Error update data:", error);
    }
  };

  const apiDataDelete = async (targetToDeleteId) => {
    try {
      await axios.delete(API_BASE_URL + targetToDeleteId);
    } catch (error) {
      console.error("Error delete data:", error.response);
    }
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, params) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    apiDataDelete(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const getModifiedProperties = (newRow, oldRow) => {
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

    return modifiedProperties;
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    const oldRow = rows.find((row) => row.id === newRow.id);
    const modifiedProperties = getModifiedProperties(newRow, oldRow);
    console.log(modifiedProperties);

    if (modifiedProperties) {
      apiDataUpdate(newRow.id, modifiedProperties);
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    ...dataGridColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteForever />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<CameraAlt />}
            label="Delete"
            //onClick={console.log("change image form")}
            color="inherit"
          />,
        ];
      },
    },
  ];



  console.log(rows);

  return (
    <Box
      sx={{
        height: "75vh",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        loading={!rows.length}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: { apiDataCreate },
        }}
      />
    </Box>
  );
}


export function multiSelectColumn(params) {
  const apiRef = useGridApiContext();

  console.log(params);
  apiRef.current.getCellValue

  return (
    <Autocomplete
      multiple
      fullWidth
      limitTags={3}
      size="small"
      defaultValue={params.value}
      options={params.value}
      renderInput={(params) => <TextField {...params} variant="standard" />}
      //onChange={(e, nv) => console.log("New", nv)}
      onChange={(e, nv) => console.log("New", nv)}
    />
  );
}