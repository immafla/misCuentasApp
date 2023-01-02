import * as React from 'react';
import {
  Stack,
  Button,
} from '@mui/material'

import { 
  NewBussines,
  NewInventary,
  NewSale,
  NewProduct
 } from './components/pages'

import './App.css'

function App() {
  const [openNewBussinesModal, setOpenNewBussinesModal] = React.useState(false);
  const [openNewInventaryModal, setOpenNewInventaryModal] = React.useState(false);
  const [openNewSaleModal, setOpenNewSaleModal] = React.useState(false);
  const [openNewProductModal, setOpenNewProductModal] = React.useState(false);

  return (
    <div className="App">
      <NewInventary open={openNewInventaryModal} setOpen={()=> setOpenNewInventaryModal(prev => !prev)} />
      <NewBussines open={openNewBussinesModal} setOpen={()=> setOpenNewBussinesModal(prev => !prev)} />
      <NewSale open={openNewSaleModal} setOpen={()=> setOpenNewSaleModal(prev => !prev)} />
      <NewProduct open={openNewProductModal} setOpen={()=> setOpenNewProductModal(prev => !prev)} />
      
      <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => setOpenNewSaleModal(prev => !prev)}>Ingresar venta</Button>
          <Button variant="contained">Ver inventario</Button>
          <Button variant="contained" onClick={() => setOpenNewProductModal(prev => !prev)} >Nuevo producto</Button>
          <Button variant="contained" onClick={() => setOpenNewInventaryModal(prev => !prev)}>Ingresar inventario</Button>
          <Button variant="outlined" onClick={() => setOpenNewBussinesModal(prev => !prev)} >Crear negocio</Button>
      </Stack>

    </div>
  )
}

export default App



