import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, {useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateContact, buscarContatoPorId, deleteContact } from '../../store/modules/contatos/contatosSlice';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    id: string;
    mode: ModeModal
}

type ModeModal = 'edit' | 'delete' | ''

function Modal({ open, handleClose, id, mode }: ModalProps) {
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const recado = useAppSelector((state) => buscarContatoPorId(state, id))
    const userLogged = useAppSelector((state) => state.userLogged);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(recado) {
            setDescription(recado.name)
            setDetail(recado.phone)
        }
    }, [recado])

    const handleConfirm = () => {
        
        if(mode === 'delete') {
            dispatch(deleteContact({ idUser: userLogged.id, idContact: id }))
        }

        if(mode === 'edit') {
            dispatch(updateContact({ idUser: userLogged.id, idContact: id, contactUpdated: { name: description ?? recado?.name, phone: detail ?? recado?.phone }}))
        }

        handleClose()
    }


    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            {mode === 'delete' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Tem certeza que deseja excluir o recado?`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Ao confirmar esta ação não poderá ser desfeita.
                        </DialogContentText>
                    </DialogContent>
                </React.Fragment>
            )}
            {mode === 'edit' && (
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">
                        {`Editar recado`}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Informe a descrição e o detalhamento.
                        </DialogContentText>
                        <>
                            <TextField value={description} name='description' label='Descrição' onChange={(ev) => setDescription(ev.target.value)}/>
                            <TextField value={detail} name='detail' label='Detalhamento' onChange={(ev) => setDetail(ev.target.value)} />
                        
                        </>
                    </DialogContent>
                </React.Fragment>
            )}
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