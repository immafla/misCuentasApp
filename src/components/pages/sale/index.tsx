import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import {
    Button,
    InputLabel,
    MenuItem,
    AppBar,
    FormControl,
    Toolbar,
    IconButton,
    Typography,
    TextField,
    Autocomplete,
    CircularProgress,
    Container,
    Box,
    Grid,
    ListItemText,
    ListItem,
    List,
    Divider
} from '@mui/material'

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { IActionsModal } from './interface'

import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

export const NewSale = ({open,setOpen}:IActionsModal) => {
    const [pasted, setPasted] = React.useState();
    const [openAutocomplete, setOpenAutocomplete] = React.useState(false);
    const [options, setOptions] = React.useState<readonly Product[] >([]);
    const [listSelectedProducts, setListSelectedProducts] = React.useState([]);

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    const loading = open && options.length === 0;
    interface Product {
        name: string;
        price: number;
    }

    React.useEffect(() => {
        const handlePaste = (event:any) => {
            console.log('CODIGO=>', event.clipboardData.getData('text'))
            setPasted(event.clipboardData.getData('text'));
        }
        window.addEventListener('paste', handlePaste)
        return () => {
          window.removeEventListener('paste', handlePaste)
        };
    })

    React.useEffect(() => {
        let active = true;
  
        if (!loading) {
          return undefined;
        }
  
        (async () => {
          await sleep(1e3); // For demo purposes.
  
          if (active) {
            setOptions([...products]);
          }
        })();
        return () => {
          active = false;
        };
      }, [loading]);
  
      React.useEffect(() => {
          if (!open) {
            setOptions([]);
          }
      }, [open]);
    
  return (
    <Dialog
        open={open} 
        onClose={() => setOpen()}
        fullScreen
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={setOpen}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Ingresar venta
                    </Typography>
                    <Button autoFocus color="inherit" onClick={setOpen}>
                        Cerrar
                    </Button>
                </Toolbar>
            </AppBar>

            <Container fixed >
            
                <Grid container sx={{ m: 2 }} rowSpacing={2} columnSpacing={{ xs: 15, sm: 2, md: 3 }} >
                    {/* NEGOCIO */}
                    <Grid item xs={8}>
                        <Box component="form" sx={{ overflow:'auto', maxHeight: '80vh', paddingInline: 1, paddingBottom:1, border: '1px dashed grey' }}>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Listado de productos
                            </Typography>
                            <List>
                                {listSelectedProducts && listSelectedProducts.map((element,index)=> (
                                    <div key={index}>
                                        <ListItem button>
                                            <ListItemText primary={element?.name} secondary={`$ ${element?.price}`} />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>

                        </Box>
                    </Grid>

                    {/* FECHA DE COMPRA */}
                    <Grid item xs={4}>
                    <FormControl fullWidth>
                        <Autocomplete
                            id="asynchronous-demo"
                            //sx={{ width: 300 }}
                            open={openAutocomplete}
                            onOpen={() => {
                                setOpenAutocomplete(true);
                            }}
                            onClose={() => {
                                setOpenAutocomplete(false);
                            }}
                            onChange={(_,value) => {
                                setListSelectedProducts(prevState => {
                                    console.log(value)
                                    prevState.push(value)
                                    return prevState
                                })
                            }}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            options={options}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Producto"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        </FormControl>
                    </Grid>

                </Grid>
            </Container>
        </Dialog>
  )
}

const products = [
    { name: 'Aguardiente cristal litro', price: 40000 },
    { name: 'Aguardiente cristal media', price: 5000 },
    { name: 'Aguardiente cristal media', price: 500 },
    { name: 'Aguardiente cristal media', price: 50 },
    { name: 'Aguardiente cristal media', price: 5 },
    
  ];