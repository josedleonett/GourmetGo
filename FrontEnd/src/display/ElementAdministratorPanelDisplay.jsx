import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { width } from '@mui/system';

export const ElementAdministratorPanelDisplay = () => {

    const { category } = useParams();
    const navigateTo = useNavigate();

    const categoriesParameters = {
        bundle: ['Id', 'Name', 'Main image', 'Gallery images', 'Starter', 'Main course', 'Desserts', 'Drinks'],
        drink: ['Id', 'Name', 'Image', 'Price', 'Amount'],
        plate: ['Id', 'Name', 'Type', 'Description', 'Image'],
      };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));

    const Box = styled(Paper)(({ theme }) => ({
        display: "flex",
        wrap: "nowrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        textAlign: 'center',
        color: theme.palette.text.secondary,
        gap: "10vw"
      }));

    function ParamsRow() {
        const parameters = categoriesParameters[category] || [];

        return (
            <React.Fragment>                    
              <Grid item xs={4}>
                {parameters.map((param, index) => (
                        <Item key={index}>{param}</Item>
        ))}</Grid>
          </React.Fragment>
        );
      }

      const [data, setData] = useState([]);
      let apiUrl = `http://localhost:8080/v1/${category}/`;
    
      // Utilizamos useMemo para almacenar la URL de la API
      const apiURLMemoized = useMemo(() => apiUrl, [apiUrl]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(apiURLMemoized);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [apiURLMemoized]);

      const handleAddClick = () => {
        navigateTo(`/administration-panel/${category}/edit`); // Navigate to the appropriate route
      };

      function DataRow() {
        return (
          <React.Fragment>
            <Grid sx={{width: "100%"}}>
            {data.map((item, index) => (
              <Grid container item>
                {Object.entries(item).map(([key, value]) => (
                  <Grid item xs={2} key={key} sx={{display: "flex", justifyContent:"space-evenly"}}>
                    <Item key={index}>
                      <strong>{key}:</strong> {value}
                    </Item>
                  </Grid>
                ))}
              </Grid>
            ))}
            </Grid>
          </React.Fragment>
        );
      }

  return (
    <Box>
        <Grid container spacing={1}>
            <Grid container item spacing={3} sx={{flexWrap: "nowrap"}}>
                  <DataRow  ></DataRow  >
            </Grid>
        </Grid>
        <button onClick={handleAddClick}>Add</button>
    </Box>
  )
}