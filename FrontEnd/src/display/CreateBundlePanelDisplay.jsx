import React, { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useNavigate  } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import FormGroup from '@mui/material/FormGroup';



const CreateBundlePanelDisplay = () => {

  const navigateTo = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bundleImage, setBundleImage] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);
  const [starters, setStarters] = useState('');
  const [mainCourses, setMainCourses] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('bundleImage', bundleImage);
    formData.append('galleryImage', galleryImage);
    formData.append('starter', starters);
    formData.append('mainCourses', mainCourses);
    formData.append('desserts', desserts);
    formData.append('drinks', drinks);

    try {
      const response = await fetch('http://localhost:8080/v1/bundle/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Bundle added successfully');
        navigateTo(`/administration-panel/bundle`);
      } else {
        console.error('Failed to add bundle');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(name)
    console.log(bundleImage)
    console.log(galleryImage)
    console.log(mainCourses),
    console.log(starters)
    console.log(desserts)
    console.log(drinks)
    console.log(description)
  };

  const [dataPlates, setDataPlates] = useState([]);
  let apiUrlPlates = `http://localhost:8080/v1/plate/`;

  const apiURLMemoizedPlates = useMemo(() => apiUrlPlates, [apiUrlPlates]);

  useEffect(() => {
    const fetchDataPlates = async () => {
      try {
        const response = await fetch(apiURLMemoizedPlates);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataPlates = await response.json();
        setDataPlates(dataPlates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(dataPlates)
    fetchDataPlates();
  }, [apiURLMemoizedPlates]);

  const [dataDrinks, setDataDrinks] = useState([]);
  let apiUrlDrinks = `http://localhost:8080/v1/drink/`;

  const apiURLMemoizedDrinks = useMemo(() => apiUrlDrinks, [apiUrlDrinks]);

  useEffect(() => {
    const fetchDataDrinks = async () => {
      try {
        const response = await fetch(apiURLMemoizedDrinks);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataDrinks = await response.json();
        setDataDrinks(dataDrinks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(dataDrinks)
    fetchDataDrinks();
  }, [apiURLMemoizedDrinks]);

    function CheckboxDrink() {
      console.log(drinks);
      
      const handleDrinkChange = (drinkId) => (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          setDrinks(prevDrinks => [...prevDrinks, drinkId]);
        } else {
          setDrinks(prevDrinks => prevDrinks.filter(id => id !== drinkId));
        }
      };
      
      return (
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            display: 'grid',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Drinks
            </ListSubheader>
          }
        >
          <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {dataDrinks.map(drink => (
              <FormControlLabel
                key={drink.id}
                control={
                  <Checkbox
                    id={`drinkCheckbox_${drink.id}`}
                    name="drinks"
                    value={drink.name}
                    checked={drinks.includes(drink.name)}
                    onChange={handleDrinkChange(drink.name)}
                  />
                }
                label={drink.name}
              />
            ))}
          </FormGroup>
        </List>
      );
    }

    function CheckboxPlateStarter() {
      console.log(starters);
    
      const handleStarterChange = (starterId) => (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          setStarters(prevStarters => [...prevStarters, starterId]);
        } else {
          setStarters(prevStarters => prevStarters.filter(id => id !== starterId));
        }
      };
    
      return (
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            display: 'grid',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Starters
            </ListSubheader>
          }
        >
          <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {dataPlates.map(plate => (
              <FormControlLabel
                key={plate.id}
                control={
                  <Checkbox
                    id={`starterCheckbox_${plate.id}`}
                    name="starters"
                    value={plate.name}
                    checked={starters.includes(plate.name)}
                    onChange={handleStarterChange(plate.name)}
                  />
                }
                label={plate.name}
              />
            ))}
          </FormGroup>
        </List>
      );
    }

    function CheckboxPlateMainCourse() {
      console.log(mainCourses);
      
      const handleMainCourseChange = (mainCourseId) => (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          setMainCourses(prevMainCourses => [...prevMainCourses, mainCourseId]);
        } else {
          setMainCourses(prevMainCourses => prevMainCourses.filter(id => id !== mainCourseId));
        }
      };
      
      return (
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            display: 'grid',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Main Courses
            </ListSubheader>
          }
        >
          <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {dataPlates.map(plate => (
              <FormControlLabel
                key={plate.id}
                control={
                  <Checkbox
                    id={`mainCourseCheckbox_${plate.id}`}
                    name="mainCourses"
                    value={plate.name}
                    checked={mainCourses.includes(plate.name)}
                    onChange={handleMainCourseChange(plate.name)}
                  />
                }
                label={plate.name}
              />
            ))}
          </FormGroup>
        </List>
      );
    }
    
    function CheckboxPlateDesserts() {
      console.log(desserts);
      
      const handleDessertChange = (dessertId) => (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          setDesserts(prevDesserts => [...prevDesserts, dessertId]);
        } else {
          setDesserts(prevDesserts => prevDesserts.filter(id => id !== dessertId));
        }
      };
      
      return (
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            display: 'grid',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Desserts
            </ListSubheader>
          }
        >
          <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {dataPlates.map(plate => (
              <FormControlLabel
                key={plate.id}
                control={
                  <Checkbox
                    id={`dessertCheckbox_${plate.id}`}
                    name="desserts"
                    value={plate.name}
                    checked={desserts.includes(plate.name)}
                    onChange={handleDessertChange(plate.name)}
                  />
                }
                label={plate.name}
              />
            ))}
          </FormGroup>
        </List>
      );
    }

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
           <TextField
              placeholder="Description"
              name="description"
              label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              name="bundleImage"
              label="Main image"
              type="file"
              onChange={(e) => setBundleImage(e.target.files[0])}
              required
            />
            <TextField
              name="galleryImages"
              label="Gallery images"
              type="file"
              inputProps={{ multiple: true }}
              onChange={(e) => setGalleryImage([...e.target.files])}
              required
            />
            <CheckboxPlateStarter onChange={(e) => setStarters(e.target.value)} />
            <CheckboxPlateMainCourse onChange={(e) => setMainCourses(e.target.value)} />
            <CheckboxPlateDesserts onChange={(e) => setDesserts(e.target.value)} />
            <CheckboxDrink onChange={(e) => setDrinks(e.target.value)} />
            <CheckboxDrink onChange={(e) => setDrinks(e.target.value)}/>
            <Button variant="contained" type='submit' onClick={handleSubmit}>Add</Button>
          </Box>
    </>
  );
}

export default CreateBundlePanelDisplay