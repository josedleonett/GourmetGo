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
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { CameraAlt, Create, DeleteForever } from "@mui/icons-material";
import {
  FormLabel,
  Input,
  Modal,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const API_BASE_URL = "http://localhost:8080/v1/drink/";
const API_BASE_IMAGE_URL = "http://localhost:8080/asset/get-object?key=";

function EditToolbar(props) {
  const { createApiData } = props;
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [payload, setPayload] = useState({ name: "", price: 0, image: null });
  const modalFieldInputs = [
    {
      type: "text",
      title: "Name",
      formLabel: "Name",
      variant: "",
      isRequired: true,
      onChange: (e) =>
        setPayload((prevState) => ({ ...prevState, name: e.target.value })),
    },
    {
      type: "number",
      title: "Price",
      formLabel: "Price",
      variant: "",
      onChange: (e) =>
        setPayload((prevState) => ({ ...prevState, price: e.target.value })),
    },
    {
      type: "file",
      title: "Image",
      formLabel: "Image",
      variant: "",
      onChange: (e) =>
        setPayload((prevState) => ({ ...prevState, image: e.target.files[0] })),
    },
  ];

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };


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
        open={open}
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
            minWidth: "400",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={onSubmitHandler}>
            <Stack gap={3}>
              <Typography variant="h5" mb={1}>
                <Create /> Add new item:
              </Typography>
              {modalFieldInputs.map((input, index) => (
                <Stack key={index}>
                  <FormLabel>{input.formLabel}</FormLabel>
                  <Input
                    name={input.title}
                    type={input.type}
                    value={input.value}
                    onChange={input.onChange}
                    required
                  />
                </Stack>
              ))}
              <Toolbar />
              <Box display="flex" gap={1} justifyContent="right">
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={onSubmitHandler}
                >
                  SAVE
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  color="error"
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



export default function AdminPanelDrinksDisplay() {
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

    if (modifiedProperties) {
      apiDataUpdate(newRow.id, modifiedProperties);
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "image",
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
      minWidth: 500,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

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
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
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
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { createApiData: apiDataCreate },
        }}
      />
    </Box>
  );
}
