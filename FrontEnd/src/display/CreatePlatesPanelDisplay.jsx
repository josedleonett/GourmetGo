import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';

const CreatePlatesPanelDisplay = () => {
  const [platesObject, setPlatesObject] = useState({
    name: "",
    images: "",
    type: "",
    description: "",
  });

  const formData = new FormData();
  formData.append('name', name);
  formData.append('type', type);
  formData.append('description', description);
  formData.append('image', image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/v1/plate/create', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        console.log('Plate created successfully.');

      } else {
        console.log('Plate creation failed.');
    
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
        <>
          <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                gap: "3vw"
          }}>
            <TextField
              placeholder="Name"
              name="name"
              label="Name"
              value={platesObject.name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              placeholder="Image"
              name="image"
              label="Image"
              value={platesObject.mainImage}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Type"
              name="type"
              label="Type"
              value={platesObject.galleryImages}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Description"
              name="description"
              label="Description"
              value={platesObject.starter}
              onChange={handleChange}
              required
            /> 
            <Button variant="contained" type='submit' onClick={handleSubmit}>Add</Button>
          </Box>
    </>
  );
}

export default CreatePlatesPanelDisplay