import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { User } from '../../store/modules/typeStore';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    indice: number;
}

function Modal({ open, handleClose, indice, user, setUser }: ModalProps) {

    const handleConfirm = () => {
        
        
        const temp = [...user.recados]

        temp.splice(indice, 1)
        setUser({...user, recados: temp})
        handleClose()
       

    }
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {`Tem certeza que deseja excluir o recado ID ${indice}?`}
            </DialogTitle>

            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Ao confirmar esta ação não poderá ser desfeita.
            </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} autoFocus color='error' variant='outlined'>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color='info' variant='contained'>Confirmo</Button>
            </DialogActions>
        </Dialog>
    )
}


export { Modal }