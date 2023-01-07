import React, { useEffect, useState, FC } from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle, 
	Stack,
} from '@mui/material'

import Dialog, { DialogProps } from '@mui/material/Dialog';

export const Modal: FC<{
    children: JSX.Element;
	onClose: () => void;
	onSubmit: () => void;
	open: boolean;
}> = ({ open, onClose, onSubmit, children }) => {

	const handleSubmit = () => {
		onSubmit();
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
						{children}
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