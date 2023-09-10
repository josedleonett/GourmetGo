/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 800,
  margin: "0 auto",
}));

const CreateBundlePanelDisplay = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState(new FormData());
  const [starters, setStarters] = useState([]);
  const [mainCourses, setMainCourses] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plateRes, drinkRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:8080/v1/plate/"),
          axios.get("http://localhost:8080/v1/drink/"),
          axios.get("http://localhost:8080/v1/category/"),
        ]);

        setStarters(plateRes.data.filter((item) => item.type === "starter"));
        setMainCourses(
          plateRes.data.filter((item) => item.type === "mainCourse")
        );
        setDesserts(plateRes.data.filter((item) => item.type === "desserts"));
        setDrinks(drinkRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Error al obtener la data", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    formData.set(name, value);
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    if (name === "galleryImages") {
      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i]);
      }
    } else {
      formData.set(name, files[0]);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked, value } = event.target;
    if (checked) {
      formData.append(name, value);
    } else {
      formData.delete(name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/bundle/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.error("There was an error creating the bundle:", error);
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h5" gutterBottom>
        Create Bundle
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          variant="outlined"
          type="file"
          name="bundleImage"
          InputLabelProps={{ shrink: true }}
          label="Bundle Image"
          onChange={handleFileChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          variant="outlined"
          type="file"
          name="galleryImages"
          InputLabelProps={{ shrink: true }}
          label="Gallery Images"
          onChange={handleFileChange}
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ multiple: true }}
        />

        {[
          { data: starters, name: "starter" },
          { data: mainCourses, name: "mainCourse" },
          { data: desserts, name: "desserts" },
          { data: drinks, name: "drinks" },
          { data: categories, name: "categories" },
        ].map((group) => (
          <FormGroup sx={{ mb: 2 }} key={group.name}>
            <Typography variant="h6">
              {group.name.charAt(0).toUpperCase() + group.name.slice(1)}
            </Typography>
            {group.data.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    name={group.name}
                    value={group.name === "categories" ? item.id : item.name}
                    onChange={handleCheckboxChange}
                  />
                }
                label={item.name}
              />
            ))}
          </FormGroup>
        ))}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Create Bundle
        </Button>
      </form>
    </StyledPaper>
  );
};

export default CreateBundlePanelDisplay;
