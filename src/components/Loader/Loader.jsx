import * as React from 'react';
import { GridLoader } from 'react-spinners';
import Box from '@mui/material/Box';
import './Loader.css'


export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' ,alignItems:'center', justifyContent:'center'}}>
      <GridLoader />
      <h2>
        Iniciando servidor...
      </h2>
    </Box>
  );
}