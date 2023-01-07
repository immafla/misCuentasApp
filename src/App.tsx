import * as React from 'react';
import {
  Stack,
  Button,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  NewBrand,
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
  const [openNewBrandModal, setOpenNewBrandModal] = React.useState(false);
  const [openNewInventaryModal, setOpenNewInventaryModal] = React.useState(false);
  const [openNewSaleModal, setOpenNewSaleModal] = React.useState(false);
  const [openNewProductModal, setOpenNewProductModal] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <NewBrand open={openNewBrandModal} setOpen={()=> setOpenNewBrandModal(prev => !prev)} />
      <NewInventary open={openNewInventaryModal} setOpen={()=> setOpenNewInventaryModal(prev => !prev)} />
      <NewSale open={openNewSaleModal} setOpen={()=> setOpenNewSaleModal(prev => !prev)} />
      <NewProduct open={openNewProductModal} setOpen={()=> setOpenNewProductModal(prev => !prev)} />
      
      <MiniDrawer 
        showProduct={()=>setOpenNewProductModal(prev => !prev)}
        showSale={()=>setOpenNewSaleModal(prev => !prev)}
        showAddInventary={()=>setOpenNewInventaryModal(prev => !prev)}
        showAddBrand={()=>setOpenNewBrandModal(prev => !prev)}
      />
        
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



