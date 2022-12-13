import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { Recado, User } from '../../config/types';
import { v4 as uuid} from 'uuid';
import { Modal } from '../../components/Modal';

const rows = [
  { id: '123', description: 'Teste', detail: 'Teste detalhamento'},
  { id: '1234', description: 'Teste', detail: 'Teste detalhamento'},
  { id: '12356', description: 'Teste', detail: 'Teste detalhamento'},
  { id: '123789', description: 'Teste', detail: 'Teste detalhamento'},
];


function Home() {
    const navigate = useNavigate();
    const [userLogged, setUserLogged] = useState<User | null>(JSON.parse(localStorage.getItem('usuarioLogado') ?? 'null'));
    const [description, setDescription] = useState('')
    const [detail, setDetail] = useState('')
    const [indiceSelecionadoExclusao, setIndiceSelecionadoExclusao] = useState(-1)
    const [openModal, setOpenModal] = useState(false)

    useEffect(
        () => {

            if(!userLogged) {
                navigate('/')
            } 
        },

       
        [navigate, userLogged]
    )

    useEffect(() => {
        // aqui executa quando os recados são atualizados -> TODO -> atualizar o localStorage
    }, [userLogged?.recados])

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
    }

    const handleSaveRecado = () => {
        const novoRecado: Recado = {
            id: uuid(),
            description,
            detail
        }

        if(userLogged) {
            setUserLogged({ ...userLogged, recados: [...userLogged.recados, novoRecado]})
            handleClear()
        }
    }

    const handleEdit = (indice: number) => {
        console.log('CLICOU EM id ', indice)
    }

    const handleDelete = (indice: number) => {
        setIndiceSelecionadoExclusao(indice);
        setOpenModal(true);
    }

    const handleClear = () => {
        setDescription('')
        setDetail('')
    }

    const handleCloseModal = () => {
        setOpenModal(false);
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
                            {userLogged?.recados.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.detail}</TableCell>
                                    <TableCell align="center">
                                        <Button color='success' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleEdit(index)}>Editar</Button>
                                        <Button color='error' variant='contained' sx={{margin: '0 15px'}} onClick={() => handleDelete(index)}>Apagar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Modal indice={indiceSelecionadoExclusao} open={openModal} handleClose={handleCloseModal} user={userLogged as User} setUser={setUserLogged}/>
        </Box>
    )
}


export { Home }