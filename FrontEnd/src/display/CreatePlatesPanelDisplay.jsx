import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';

const CreatePlatesPanelDisplay = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

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
          <TextField type="text" value={name} label="Name" placeholder='Name' onChange={(e) => setName(e.target.value)} />
          <TextField type="text" value={type} label="Type" placeholder='Type of plate' onChange={(e) => setType(e.target.value)} />
          <TextField type="text" value={description} label="Description" placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
          <TextField type="file" label="Image" placeholder='Image' onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Create Plate</button>
      </Box>
    </>
  );
}

export default CreatePlatesPanelDisplay