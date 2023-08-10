import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate  } from 'react-router-dom';

export const ElementAdministratorPanelDisplay = () => {

    const { category } = useParams();
    const navigateTo = useNavigate();

    const categoriesParameters = {
        bundles: ['Name', 'Main image', 'Gallery images', 'Starter', 'Main course', 'Desserts', 'Drinks'],
        drinks: ['Name', 'Image', 'Price', 'Amount'],
        plates: ['Name', 'Type', 'Description', 'Image'],
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

    function FormRow() {
        const parameters = categoriesParameters[category] || [];

        return (
            <React.Fragment>
                {parameters.map((param, index) => (
                    <Grid item xs={4} key={index}>
                        <Item>{param}</Item>
                    </Grid>
        ))}
          </React.Fragment>
        );
      }

      const handleAddClick = () => {
        navigateTo(`/administration-panel/${category}/edit`); // Navigate to the appropriate route
      };

  return (
    <Box>
        <Grid container spacing={1}>
            <Grid container item spacing={3} sx={{flexWrap: "nowrap"}}>
                  <FormRow />
            </Grid>
        </Grid>
        <button onClick={handleAddClick}>Add</button>
    </Box>
  )
}