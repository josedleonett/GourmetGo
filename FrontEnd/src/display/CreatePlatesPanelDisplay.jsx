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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(platesObject)
  };

  const handleChange = (e) => {
    setPlatesObject({
      ...platesObject,
      [e.target.name]: e.target.value,
    });
    console.log(platesObject)
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
              onChange={handleChange}
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