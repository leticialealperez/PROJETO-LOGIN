import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { v4 as uuid} from 'uuid';
import { Modal } from '../../components/Modal';
import { Contato, User } from '../../store/modules/typeStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarUsuario, buscarUsuarioPorEmail } from '../../store/modules/users/usersSlice';
import { saveContact, getContacts, buscarContatos, limparRecados } from '../../store/modules/contatos/contatosSlice';
import { clearUsuarioLogado } from '../../store/modules/userLogged/userLoggedSlice';

function Home() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('')
    const [detail, setDetail] = useState('')
    const [idSelecionado, setIdSelecionado] = useState('')
    const [mode, setMode] = useState<'edit' | 'delete' | ''>('');
    const [openModal, setOpenModal] = useState(false)
    const userLogged = useAppSelector((state) => state.userLogged)
    const usuarioRedux = useAppSelector((state) => buscarUsuarioPorEmail(state, userLogged.email))
    const recadosRedux = useAppSelector(buscarContatos);
    const dispatch = useAppDispatch()

    useEffect(
        () => {

            if(!userLogged.email) {
                navigate('/')
            } 

            if(usuarioRedux) {
                dispatch(getContacts(userLogged.email))
            }

        },

       
        [navigate, userLogged, usuarioRedux, dispatch]
    )

    const mudarInput = (value: string, key: InputName) => {
        switch(key) {
            case 'description':
                setDescription(value)
            break;

            case 'detail':
                setDetail(value)
            break;

            default:
        }
    }

    const handleSaveAndLogout = () => {
        console.log('user', userLogged)

       if(recadosRedux) {
         dispatch(atualizarUsuario({ id: userLogged.email, changes: { contacts: recadosRedux } }))
       }

       dispatch(clearUsuarioLogado())
       dispatch(limparRecados())

       navigate('/')
    }

    const handleSaveRecado = () => {
        const novoContato: Omit<Contato, 'id'> = {
            name: description,
            phone: detail
        }

        dispatch(saveContact({ idUser: userLogged.id, newContact: novoContato }))
        handleClear()
    }

    const handleEdit = (id: string) => {
        setMode('edit')
        setIdSelecionado(id);
        setOpenModal(true);
    }

    const handleDelete = (id: string) => {
        setMode('delete');
        setIdSelecionado(id);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleClear = () => {
        setDescription('')
        setDetail('')
        setMode('')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container flexDirection='row-reverse' spacing={5}>
                <Grid item xs={12} sm={2}>
                    <Button onClick={handleSaveAndLogout} variant='contained' color='secondary' size='small'>Sair</Button>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <h1>HELLOW, {userLogged?.name}</h1>
                </Grid>
            </Grid>
            <Grid container columnSpacing={3} alignItems={'center'} marginY={5} padding={2}>
                <Grid item xs={4}>
                    <InputDefault type='text' label='Descrição' name='description' value={description} color='secondary' handleChange={mudarInput}/>
                </Grid>
                <Grid item xs={4}>
                    <InputDefault type='text' label='Detalhamento' name='detail' value={detail} color='secondary' handleChange={mudarInput}/>
                </Grid>
                <Grid item xs={4}>
                    <Button variant='contained' color='secondary' size='large' onClick={handleSaveRecado}>Salvar</Button>
                </Grid>
            </Grid>
            <Grid container paddingX={3}>
                <Grid xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">Descrição</TableCell>
                                    <TableCell align="center">Detalhamento</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {recadosRedux.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">
                                        <Button color='success' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleEdit(row.id)}>Editar</Button>
                                        <Button color='error' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleDelete(row.id)}>Apagar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Modal mode={mode} id={idSelecionado} open={openModal} handleClose={handleCloseModal}/>
        </Box>
    )
}


export { Home }