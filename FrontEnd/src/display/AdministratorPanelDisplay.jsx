    import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const AdministratorPanelDisplay = () => {
    const ButtonPanel = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontSize: "1.5vw",
        textDecoration: 'none',
      }));

      const Box = styled(Paper)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      function FormRow() {
        return (
            <React.Fragment>
            <Grid item xs={4}>
              <Link to="/administration-panel/bundles">
                <ButtonPanel>
                    Bundle
                </ButtonPanel>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link to="/administration-panel/drinks">
                <ButtonPanel>
                    Drinks
                </ButtonPanel>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link to="/administration-panel/plates">
                <ButtonPanel>
                    Plates
                </ButtonPanel>
              </Link>
            </Grid>
          </React.Fragment>
        );
      }

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow/>
        </Grid>
      </Grid>
    </Box>
  )
}