import React, { FC, useState, useMemo, useCallback } from 'react'
import { validateRequired, validateEmail, validateAge } from '../../../utils'
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Box,
    Tooltip,
    IconButton,
    MenuItem,
		Stack,
} from '@mui/material'
import MaterialReactTable, {
    MaterialReactTableProps,
    MRT_Cell,
    MRT_ColumnDef,
    MRT_Row,
  } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { data, states } from './makeData';
import { Delete, Edit, AddCircle } from '@mui/icons-material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { IActionsModal, Product } from './interface';

export const NewProduct = ({open,setOpen}: IActionsModal) => {
	const [tableData, setTableData] = useState<Product[]>(() => data);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('lg');
	const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
      [cellId: string]: string;
    }>({});

  const handleSaveRowEdits: MaterialReactTableProps<Product>['onEditingRowSave'] =
      async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
          tableData[row.index] = values;
          setTableData([...tableData]);
          exitEditingMode();
      }
  };

  const handleCancelRowEdits = () => {
      setValidationErrors({});
    };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Product>) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

	const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Product>,
    ): MRT_ColumnDef<Product>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

	const handleCreateNewRow = (values: Product) => {
		console.log(values)
    tableData.push(values);
    setTableData([...tableData]);
  };

	const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre del producto',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					variant:"outlined",
          ...getCommonEditTextFieldProps(cell),
        }),
      },
			{
        accessorKey: 'brand',
        header: 'Marca',
        size: 120,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					variant:"outlined",
          ...getCommonEditTextFieldProps(cell),
        }),
      },
			{
        accessorKey: 'amount',
        header: 'Disponibles',
        size: 2,
				enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					variant:"outlined",
          ...getCommonEditTextFieldProps(cell),
        }),
				Cell: ({ cell }) => (
					<Box
						sx={(theme) => ({
							backgroundColor:
								cell.getValue<number>() < 10
									? theme.palette.error.dark
									: cell.getValue<number>() >= 10 &&
										cell.getValue<number>() < 20
									? theme.palette.warning.dark
									: theme.palette.success.dark,
							borderRadius: '0.25rem',
							color: '#fff',
							maxWidth: '9ch',
							p: '0.25rem',
						})}
					>
						{cell.getValue<number>()}
						{/* {cell.getValue<number>()?.toLocaleString?.('en-US', {
							style: 'currency',
							currency: 'USD',
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})} */}
					</Box>
				),
      },
			{
        accessorKey: 'category',
        header: 'Categoria',
				size: 40,
        muiTableBodyCellEditTextFieldProps: {
					variant:"outlined",
          select: true, //change to select for a dropdown
          children: states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      },
			{
        accessorKey: 'purchase_price',
        header: 'Precio de compra',
        size: 20,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					variant:"outlined",
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue<number>()?.toLocaleString?.('es-CO', {
							style: 'currency',
							currency: 'COP',
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}
					</Box>
				),
      },
      {
        accessorKey: 'sale_price',
        header: 'Precio de venta',
        size: 20,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
					variant:"outlined",
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue<number>()?.toLocaleString?.('es-CO', {
							style: 'currency',
							currency: 'COP',
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}
					</Box>
				),
      }
    ],
    [getCommonEditTextFieldProps],
  );

  return (
    <Dialog 
      open={open} 
      onClose={() => setOpen()}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle>Inventario</DialogTitle>
      <DialogContent>
        <MaterialReactTable
					positionActionsColumn="last"
					muiTableBodyRowProps={{ hover: false }}
					enableDensityToggle={false}
					enableFullScreenToggle={false}
					enableHiding={false}
					enableRowOrdering={false}
					enableColumnFilters={false}
					enableSorting={false}
					initialState={{ density: 'compact' }}
					editingMode="modal"
					localization={MRT_Localization_ES}
					columns={columns}
          data={tableData}
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          displayColumnDefOptions={{
						'mrt-row-actions': {
								header: 'Editar producto',
								muiTableHeadCellProps: {
									align: 'left'
								},
								size: 20,
						},
          }}
					muiSearchTextFieldProps={{
						placeholder: 'Buscar productos',
						sx: { minWidth: '400px' },
						variant: 'outlined',
					}}
          renderRowActions={({ row, table }) => (
						<Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Editr">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                      <Edit />
                  </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                      <Delete />
                  </IconButton>
              </Tooltip>
            </Box>
					)}
          renderTopToolbarCustomActions={() => (
						<Button
							color="primary"
							onClick={() => setCreateModalOpen(true)}
							variant="contained"
						>
							<Box sx={{ display: 'flex', gap: '1rem' }}>
								<AddCircle color="secondary"/>  Crear producto
							</Box>
						</Button>
          )}
        />
				<CreateNewAccountModal
					columns={columns}
					open={createModalOpen}
					onClose={() => setCreateModalOpen(false)}
					onSubmit={handleCreateNewRow}
				/>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" onClick={() => setOpen()}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export const CreateNewAccountModal: FC<{
	columns: MRT_ColumnDef<Product>[];
	onClose: () => void;
	onSubmit: (values: Product) => void;
	open: boolean;
}> = ({ open, columns, onClose, onSubmit }) => {
	const [values, setValues] = useState<any>(() =>
		columns.reduce((acc, column) => {
			acc[column.accessorKey ?? ''] = '';
			return acc;
		}, {} as any),
	);

	const handleSubmit = () => {
		onSubmit(values);
		onClose();
	};

	return (
		<Dialog open={open}>
			<DialogTitle textAlign="center">Crear nuevo producto</DialogTitle>
			<DialogContent>
				<form onSubmit={(e) => e.preventDefault()} >
					<Stack
						sx={{
							width: '100%',
							minWidth: { xs: '300px', sm: '360px', md: '400px'},
							gap: '1.5rem',
							pt:1
						}}
					>
						{columns.map((column) => (
								column.accessorKey != 'amount' ? (
									<TextField
										key={column.accessorKey}
										label={column.header}
										name={column.accessorKey}
										variant="outlined"
										onChange={(e) =>
											setValues({ ...values, [e.target.name]: e.target.value })
										}
									/>
								) : null
						))}
					</Stack>
				</form>
			</DialogContent>
			<DialogActions sx={{ p: '1.25rem' }}>
				<Button onClick={onClose}>Cancel</Button>
				<Button color="primary" onClick={handleSubmit} variant="contained">
					Crear
				</Button>
			</DialogActions>
		</Dialog>
	);
};