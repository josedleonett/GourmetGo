import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';


const CreateBundlePanelDisplay = () => {
  const [bundleObject, setBundleObject] = useState({
    name: "",
    mainImage: "",
    galleryImages: "",
    starter: "",
    mainCourse: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(bundleObject)
  };

  const handleChange = (e) => {
    setBundleObject({
      ...bundleObject,
      [e.target.name]: e.target.value,
    });
    console.log(bundleObject)
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
              value={bundleObject.name}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Main image"
              name="mainImage"
              label="Main image"
              value={bundleObject.mainImage}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Gallery images"
              name="galleryImages"
              label="Gallery images"
              value={bundleObject.galleryImages}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Starters"
              name="starter"
              label="Starters"
              value={bundleObject.starter}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Main course"
              name="mainCourse"
              label="Main course"
              value={bundleObject.mainCourse}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Desserts"
              name="desserts"
              label="Desserts"
              value={bundleObject.desserts}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Drinks"
              name="drinks"
              label="Drinks"
              value={bundleObject.drinks}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type='submit' onClick={handleSubmit}>Add</Button>
          </Box>
    </>
  );
}

export default CreateBundlePanelDisplay