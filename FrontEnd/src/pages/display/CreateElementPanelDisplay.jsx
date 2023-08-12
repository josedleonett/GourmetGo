import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import CreateBundlePanelDisplay from '../../components/display/CreateBundlePanelDisplay';
import CreateDrinksPanelDisplay from '../../components/display/CreateDrinksPanelDisplay';
import CreatePlatesPanelDisplay from '../../components/display/CreatePlatesPanelDisplay';

const CreateElementPanelDisplay = () => {
  const { category } = useParams();

  let modalContent;

  switch (category) {
    case 'bundle':
      modalContent = <CreateBundlePanelDisplay />;
      break;
    case 'drink':
      modalContent = <CreateDrinksPanelDisplay />;
      break;
    case 'plate':
      modalContent = <CreatePlatesPanelDisplay />;
      break;
    default:
      modalContent = <div>Invalid category</div>;
  }

  return (
    <>
      {modalContent}
    </>
      
  )
};

export default CreateElementPanelDisplay;