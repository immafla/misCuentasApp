import React , { FC, useState, useEffect, SetStateAction } from 'react'
import { Modal } from '../../modal/index'
import { MRT_ColumnDef } from 'material-react-table';
import {
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
    Select
} from '@mui/material'

export const NewProductModal: FC<{
    columns: MRT_ColumnDef<any>[];
    onClose: () => void;
	onSubmit: (values:any) => void;
	open: boolean;
}> = ({ columns, open, onClose, onSubmit }) => {

    const [brandList, setBrandList] = useState([
        {
            label: '',
            value: ''
        },
        {
            label: 'Faber castell',
            value: 'Faber castell'
        },
        {
            label: 'Prueba',
            value: 'Prueba'
        }
    ])

    const [categoryList, setCategoryList] = useState([
        {
            label: '',
            value: ''
        },
        {
            label: 'Faber castell',
            value: 'Faber castell'
        },
        {
            label: 'Prueba',
            value: 'Prueba'
        }
    ])

    const [brandSelected, setBrandSelected] = useState(
        {
            label: '',
            value: ''
        },
    )

    const [categorySelected, setCategorySelected] = useState(
        {
            label: '',
            value: ''
        },
    )


    const [values, setValues] = useState<any>(() =>
		columns.reduce((acc, column) => {
			acc[column.accessorKey ?? ''] = '';
			return acc;
		}, {} as any),
	);

    const onSubmitModal = () => {
        onSubmit(values)
    }

    useEffect(()=>{
        console.log({columns})
    },[columns])

    return (
        <Modal open={open} onClose={onClose} onSubmit={onSubmitModal}>
            <>
                
                {columns.map((column, index) => {
                    return(
                        column.accessorKey != 'amount' && column.accessorKey != 'brand' && column.accessorKey != 'category' ? (
                            <TextField
                                key={index}
                                label={column.header}
                                //name={column.accessorKey}
                                variant="outlined"
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ) : null
                    )
                })}

                <FormControl fullWidth>
                    <InputLabel id="brand-label">Marca</InputLabel>
                    <Select
                        labelId="brand-label"
                        id="brand"
                        value={brandSelected.value}
                        label="Brand"
                        onChange={(event)=> setBrandSelected(event.target as SetStateAction<any>)}
                        >
                            {brandList.map((element, index)=>(
                                <MenuItem 
                                    key={index} 
                                    value={element.value}
                                    >
                                        {element.label}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        value={categorySelected.value}
                        label="Category"
                        onChange={(event)=> setCategorySelected(event.target as SetStateAction<any>)}
                        >
                            {categoryList.map((element, index)=>(
                                <MenuItem 
                                    key={index} 
                                    value={element.value}
                                    >
                                        {element.label}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </>
        </Modal>
    )
}
