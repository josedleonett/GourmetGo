import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit, Add } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { API_BASE_IMAGE_URL, API_BASE_URL } from "../../utils/urlApis";

const API_BASE_URL_local = `${API_BASE_URL}drink/`;

function AdminPanelPlatesDessertDisplay() {
  const [data, setData] = useState([]);
  const [newDrinkData, setNewDrinkData] = useState({
    name: "",
    image: "",
    price: 0,
    imageFile: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editDrinkId, setEditDrinkId] = useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <Box
          component="img"
          height="90%"
          src={`${API_BASE_IMAGE_URL}${params.value}`}
        />
      ),
    },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)}>
            <Edit />
          </button>
          <button onClick={() => handleDelete(params.row)}>
            <Delete />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_BASE_URL_local);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newDrinkData.name);
      formData.append("image", newDrinkData.imageFile);
      formData.append("price", newDrinkData.price);
      await axios.post(API_BASE_URL_local + "create", formData);
      fetchData();
      setNewDrinkData({ name: "", image: "", price: 0, imageFile: null });
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleEdit = (drinkToEdit) => {
    setEditMode(true);
    setEditDrinkId(drinkToEdit.id);
    setNewDrinkData({
      name: drinkToEdit.name,
      image: "",
      price: drinkToEdit.price,
      imageFile: null,
    });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newDrinkData.name);
      formData.append("image", newDrinkData.imageFile);
      formData.append("price", newDrinkData.price);
      await axios.patch(API_BASE_URL_local + editDrinkId, formData);
      fetchData();
      setEditMode(false);
      setEditDrinkId(null);
      setNewDrinkData({ name: "", image: "", price: 0, imageFile: null });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (drinkToDelete) => {
    try {
      await axios.delete(API_BASE_URL_local + drinkToDelete.id);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleNewDrinkChange = (event, field) => {
    if (field === "image") {
      setNewDrinkData({
        ...newDrinkData,
        image: event.target.value,
        imageFile: event.target.files[0],
      });
    } else {
      setNewDrinkData({ ...newDrinkData, [field]: event.target.value });
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <div style={{ marginBottom: "10px" }}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newDrinkData.name}
                onChange={(e) => handleNewDrinkChange(e, "name")}
              />
            </div>
            <div>
              <label>Image:</label>
              <input
                type="file"
                onChange={(e) => handleNewDrinkChange(e, "image")}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                value={newDrinkData.price}
                onChange={(e) => handleNewDrinkChange(e, "price")}
              />
            </div>
            {editMode ? (
              <button onClick={handleUpdate}>Update</button>
            ) : (
              <button onClick={handleCreate}>
                <Add /> Create New
              </button>
            )}
          </div>
          <DataGrid rows={data} columns={columns} pageSize={5} />
        </div>
      )}
    </>
  );
}

export default AdminPanelPlatesDessertDisplay;
