import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useNavigate  } from 'react-router-dom';

const CreateDrinksPanelDisplay = () => {

  const navigateTo = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/v1/drink/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigateTo(`/administration-panel/drink`);
      } else {
        console.error('Failed to add drink');
      }
    } catch (error) {
      console.error('Error:', error.response);
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
          value={price}
          label="Price"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          type="file"
          label="Image"
          placeholder="Image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" onClick={handleSubmit}>
          Create Drink
        </button>
      </Box>
    </>
  );
};

export default CreateDrinksPanelDisplay;
