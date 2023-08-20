import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { useFormik } from "formik";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip, Typography,
} from '@mui/material';
import { Delete, Edit, Add, Save, Cancel, Error, Check } from '@mui/icons-material';

const AdminPanelDataGridDisplay = ({ props }) => {
  const API_BASE_URL = props.API_BASE_URL;
  const API_BASE_IMAGE_URL = props.API_BASE_IMAGE_URL;
  const PropsColumns = props.columns;
  // const modalFormInputs = props.modal.formInputs;

  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {

    !data.length ? setIsLoading(true) : setIsRefetching(true);

    try {
      const response = await axios.get(API_BASE_URL);
      setData(response.data);
      console.log(response.data);

    } catch (error) {
      setIsError(true)
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
        if (propertiesToCreate.hasOwnProperty(key)) {
          formData.append(key, propertiesToCreate[key]);
        }
      }


      
      //CHECK OUTPUT
      for (const [key, value] of formData.entries()) {
        console.log("aqui");
        console.log(key, value);
        console.log("aqui");
      }




      const response = await axios.post(API_BASE_URL + "create", formData);
      const responseCode = response.status;

      getApiData();
      return responseCode;
      
    } catch (error) {
      const responseCode = error.response.status;
      console.error("Error create data:", error);

      return responseCode;
    }
  }


  const handleCreateNewRow = (values) => {
    data.push(values);
    setData([...data]);

    const responseCode = postApiData(values);
    return responseCode;

  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      data[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setData([...data]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      data.splice(row.index, 1);
      setData([...data]);
    },
    [data],
  );

  const columns = useMemo(() => PropsColumns,
  //[getCommonEditTextFieldProps]
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
        editingMode="modal" //default
        enableColumnOrdering
        enableStickyHeader
        enableEditing
        enableRowDragging
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
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
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            startIcon={<Add />}
          >
            Create new item
          </Button>
        )}
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
      />
      <CreateNewItemModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmitHandler={handleCreateNewRow}
        isLoading={isLoading}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewItemModal = ({ open, columns, onClose, onSubmitHandler, isLoading }) => {
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isResponseSuccess, setIsResponseSuccess] = useState(null);

  const onCloseHandler = () => {
    setIsResponseSuccess(null);
    formik.resetForm()
    onClose();
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      setIsFormSending(true)
      alert(JSON.stringify(values, null, 2));

      const responseCode = await onSubmitHandler(values);
      console.log(responseCode + " codigo respuesta");
        setIsFormSubmitted(true);

        if (responseCode === 201) {
          setIsResponseSuccess(true);
          setTimeout(async () => {
            await onCloseHandler();
          }, 1500);

        } else {
          setIsResponseSuccess(false);
        }
        
        setIsFormSending(false);
    }
  })

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Item</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <>
                {column.isFileType ? (
                  <Input
                    id={column.accessorKey}
                    type="file"
                    key={column.accessorKey}
                    label={column.header}
                    name={column.categoryImg || column.accessorKey}
                    onChange={(e) =>
                      formik.setFieldValue(
                        column.imgPostDir || column.accessor,
                        column.isMultiple
                          ? e.currentTarget.files
                          : e.currentTarget.files[0]
                      )
                    }
                    disabled={isFormSending && column.enableEditing === false}
                  />
                ) : (
                  <TextField
                    id={column.accessorKey}
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={formik.handleChange}
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
        <Box display={isResponseSuccess === null ? "none" : "flex"}>
          <Alert severity={isResponseSuccess ? "success" : "error"}  sx={{width: "100%"}}>
            <AlertTitle>{isResponseSuccess ? "Success" : "Error"}</AlertTitle>
            {isResponseSuccess
              ? "Item added successfully!."
              : "Oops! An error occurred while adding the item."}
          </Alert>
        </Box>

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
          startIcon={isFormSending ? <CircularProgress size={24} /> : <Save />}
          disabled={isFormSending}
        >
          {isFormSending ? "SAVING..." : "SAVE"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminPanelDataGridDisplay;
