import * as React from 'react';
import {
  Stack,
  Button,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  NewBussines,
  NewInventary,
  NewSale,
  NewProduct
 } from './components/pages'

import {
  MiniDrawer
} from './components/molecules'

import './App.css'

import { blue } from '@mui/material/colors';

function App() {
  const [openNewBussinesModal, setOpenNewBussinesModal] = React.useState(false);
  const [openNewInventaryModal, setOpenNewInventaryModal] = React.useState(false);
  const [openNewSaleModal, setOpenNewSaleModal] = React.useState(false);
  const [openNewProductModal, setOpenNewProductModal] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <MiniDrawer 
        showProduct={()=>setOpenNewProductModal(prev => !prev)}
        showSale={()=>setOpenNewSaleModal(prev => !prev)}
        showAddInventary={()=>setOpenNewInventaryModal(prev => !prev)}
      />
        <NewInventary open={openNewInventaryModal} setOpen={()=> setOpenNewInventaryModal(prev => !prev)} />
        {/* <NewBussines open={openNewBussinesModal} setOpen={()=> setOpenNewBussinesModal(prev => !prev)} /> */}
        <NewSale open={openNewSaleModal} setOpen={()=> setOpenNewSaleModal(prev => !prev)} />
        <NewProduct open={openNewProductModal} setOpen={()=> setOpenNewProductModal(prev => !prev)} />
        
      {/* <div className="App">
        
        <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => setOpenNewSaleModal(prev => !prev)}>Ingresar venta</Button>
            <Button variant="contained" onClick={() => setOpenNewProductModal(prev => !prev)} >Inventario</Button>
            <Button variant="contained" onClick={() => setOpenNewInventaryModal(prev => !prev)}>Ingresar inventario</Button>
        </Stack>

      </div> */}
    </ThemeProvider>
  )
}

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[600],
    },
    secondary: {
      // This is green.A700 as hex.
      main: blue[50],
    },
  },
});

export default App



