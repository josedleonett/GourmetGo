import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import CreateBundlePanelDisplay from './CreateBundlePanelDisplay';
import CreateDrinksPanelDisplay from './CreateDrinksPanelDisplay';
import CreatePlatesPanelDisplay from './CreatePlatesPanelDisplay';

const CreateElementPanelDisplay = () => {
  const { category } = useParams();

  let modalContent;

  switch (category) {
    case 'bundles':
      modalContent = <CreateBundlePanelDisplay />;
      break;
    case 'drinks':
      modalContent = <CreateDrinksPanelDisplay />;
      break;
    case 'plates':
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