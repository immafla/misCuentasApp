import React from 'react'
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material'

import Dialog, { DialogProps } from '@mui/material/Dialog';
import { IActionsModal } from './interface';
import { ApiService } from '../../../services/api.service'
export const NewBussines = ({open,setOpen}:IActionsModal):JSX.Element => {
    const api = new ApiService()
    const [name, setName] = React.useState('');

    const saveBussines = async () => {
        const bussines = await api.setBussines({name})
        const response = await bussines.json()
        if(response){
            setOpen()
            setName('')
        }
        // const products = await api.getAllProducts()
        // console.log(await products.json())
    }

    // TABLE STATES
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Dialog 
            open={open} 
            onClose={() => setOpen()}
            fullWidth={true}
            maxWidth={'sm'}
        >
            {/* <Alert variant="filled" severity="success">
                This is a success alert — check it out!
            </Alert> */}
            <DialogTitle>Ingresa el nombre de tu nuevo negocio</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre del negocio"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={(value)=>{
                        setName(value.target.value)
                    }}
                />
            </DialogContent>

            {/* INICIO TABLA */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* FIN TABLA */}
            <DialogActions>
                <Button onClick={() => setOpen()}>Cancelar</Button>
                <Button variant="contained" onClick={() => saveBussines()}>Crear</Button>
            </DialogActions>
        </Dialog>
    )
}


const rows = [
    createData('Papeleria'),
    createData('Licorera'),
  ];


  interface Column {
    id: 'name';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
  ];
  
  interface Data {
    name: string;
  }
  
  function createData(
    name: string,
  ): Data {
    return { name };
  }
  