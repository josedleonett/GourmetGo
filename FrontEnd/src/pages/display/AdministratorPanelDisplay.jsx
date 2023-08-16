import React from 'react';
import { Paper, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const ButtonPanel = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2), // Mayor padding para más espacio
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '2vw', // Mayor tamaño de fuente para botones más grandes
  textDecoration: 'none',
  marginBottom: theme.spacing(6), // Mayor margen inferior
  borderRadius: theme.spacing(2), // Bordes redondeados
  transition: 'transform 0.2s ease-in-out', // Animación de transformación
  '&:hover': {
    transform: 'scale(1.05)', // Aumentar tamaño al pasar el cursor
  },
}));

const TitleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light, // Color de fondo deseado
  padding: theme.spacing(2),
  width: '100%',
  textAlign: 'center',
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  marginTop: -252,
  marginBottom: 50, // Elimina el margen superior
}));

const ContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh', // Ajusta la altura según tus necesidades
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const AdministratorPanelDisplay = () => {
  return (
    <ContainerBox>
      <TitleBox>
        <Typography variant="h4">Administration Panel</Typography>
      </TitleBox>
      <Link to="/administration-panel/bundle" style={{ textDecoration: 'none' }}>
        <ButtonPanel>
          Bundle
        </ButtonPanel>
      </Link>
      <Link to="/administration-panel/drink" style={{ textDecoration: 'none' }}>
        <ButtonPanel>
          Drinks
        </ButtonPanel>
      </Link>
      <Link to="/administration-panel/plate" style={{ textDecoration: 'none' }}>
        <ButtonPanel>
          Plates
        </ButtonPanel>
      </Link>
    </ContainerBox>
  );
};
