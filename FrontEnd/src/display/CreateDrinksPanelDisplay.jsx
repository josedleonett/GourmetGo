import React, { useState, useEffect, useMemo  } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';

const CreateDrinksPanelDisplay = () => {

  const [drinkObject, setDrinkObject] = useState({
    name: "",
    image: "",
    price: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/v1/drink/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(drinkObject),
      });
      if (response.ok) {
        console.log('Drink added successfully');
      } else {
        console.error('Failed to add drink');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setDrinkObject({
      ...drinkObject,
      [e.target.name]: e.target.value,
    });
    console.log(drinkObject)
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
              value={drinkObject.name}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Image"
              name="image"
              label="Image"
              value={drinkObject.image}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Price"
              name="price"
              label="Price"
              value={drinkObject.price}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Amount"
              name="amount"
              label="Amount"
              value={drinkObject.amount}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type='submit' onClick={handleSubmit}>Add</Button>
          </Box>
    </>
  );
};

export default CreateDrinksPanelDisplay;