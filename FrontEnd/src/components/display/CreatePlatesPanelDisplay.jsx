// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// eslint-disable-next-line no-unused-vars
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/urlApis";

const CreatePlatesPanelDisplay = () => {
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const response = await fetch(`${API_BASE_URL}plate/create`, {
        method: "POST",
        body: formData,
      });
      if (response.status === 201) {
        navigateTo(`/administration-panel/plate`);
      } else {
        console.log("Plate creation failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          textAlign: "center",
          gap: "3vw",
        }}
      >
        <TextField
          type="text"
          value={name}
          label="Name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="text"
          value={type}
          label="Type"
          placeholder="Type of plate"
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          type="text"
          value={description}
          label="Description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="file"
          label="Image"
          placeholder="Image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Create Plate</button>
      </Box>
    </>
  );
};

export default CreatePlatesPanelDisplay;
