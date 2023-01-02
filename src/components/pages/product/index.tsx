import React from 'react'
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Container
} from '@mui/material'

import { SelectChangeEvent } from '@mui/material/Select';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { IActionsModal } from './interface';
import MaterialTable from 'material-table';

export const NewProduct = ({open,setOpen}: IActionsModal) => {

    const [age, setAge] = React.useState('');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    
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
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            <DialogTitle>Ingresa el producto</DialogTitle>
            <DialogContent>
                <Container fixed >
                
                    <Grid container sx={{ m: 2 }} rowSpacing={2} columnSpacing={{ xs: 15, sm: 2, md: 3 }} >
                        
                        {/* NOMBRE DEL PRODUCTO */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Nombre del producto"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>

                        {/* CATEGORIA */}
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Categoria"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Licorera</MenuItem>
                                    <MenuItem value={20}>Papeleria</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        

                        {/* VALOR UNITARIO */}
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="code"
                                    label="Valor unitario"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
            </Container>
                
                

                

                {/* INICIO TABLA */}
                {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                </Paper> */}

<MaterialTable
      title="Simple Action Preview"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}        
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
    />
                {/* FIN TABLA */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen()}>Cancelar</Button>
                <Button variant="contained" onClick={() => setOpen()}>Crear</Button>
            </DialogActions>
        </Dialog>
    )
}

const rows = [
    createData('Cuaderno','Papeleria', 5000)
  ];


  interface Column {
    id: 'name' | 'category' | 'price';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Nombre del producto', minWidth: 170 },
    { id: 'category', label: 'Categoria', minWidth: 80 },
    { id: 'price', label: 'Valor', minWidth: 80 },
  ];
  
  interface Data {
    name: string;
    price: number,
    category: string
  }
  
  function createData(
    name: string,
    category: string,
    price: number,
  ): Data {
    return { name, category, price };
  }