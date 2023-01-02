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
    Grid
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import { IActionsModal } from './interface'

import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

export const NewInventary = ({open,setOpen}:IActionsModal):JSX.Element => {

    const [age, setAge] = React.useState('');
    const [openAutocomplete, setOpenAutocomplete] = React.useState(false);
    const [options, setOptions] = React.useState<readonly Film[]>([]);

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    function sleep(delay = 0) {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const handleChangeDate = (newValue: Dayjs | null) => {
        setValue(newValue);
      };
    const loading = open && options.length === 0;

    interface Film {
      title: string;
      year: number;
    }

    React.useEffect(() => {
      let active = true;

      if (!loading) {
        return undefined;
      }

      (async () => {
        await sleep(1e3); // For demo purposes.

        if (active) {
          setOptions([...topFilms]);
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
                        Ingresar inventario
                    </Typography>
                    <Button autoFocus color="inherit" onClick={setOpen}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>

            <Container fixed >
            
                <Grid container sx={{ m: 2 }} rowSpacing={2} columnSpacing={{ xs: 15, sm: 2, md: 3 }} >
                    {/* NEGOCIO */}
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Negocio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Negocio"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Licorera</MenuItem>
                                <MenuItem value={20}>Papeleria</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* FECHA DE COMPRA */}
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    label="Fecha de compra"
                                    inputFormat="DD/MM/YYYY"
                                    value={value}
                                    onChange={handleChangeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    {/* PRODUCTO */}
                    <Grid item xs={6}>
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
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            getOptionLabel={(option) => option.title}
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

                    {/* PROVEEDOR */}
                    <Grid item xs={6}>
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
                                isOptionEqualToValue={(option, value) => option.title === value.title}
                                getOptionLabel={(option) => option.title}
                                options={options}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Proveedor"
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

                    {/* CANTIDAD */}                        
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-number"
                                label="Cantidad"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    {/* VALOR UNITARIO */}            
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-number"
                                label="Valor unitario"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    )
}



const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];