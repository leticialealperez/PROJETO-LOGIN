import React from 'react';
import { InputDefault } from '../InputDefault';
import { Stack, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormProps {
    mode: 'login' | 'signup';
}

function Form({ mode }: FormProps) {
    const navigate = useNavigate();

    const mudarInput = () => {
        console.log('deu bom')
    }

    const handleNavigate = () => {
        if(mode === 'login') {
            navigate('/signup')
        } else {
            navigate('/')
        }
    }

    return (
        <>
            <Stack direction="column" spacing={2} sx={{width: '80%'}}>
                { mode === 'signup' && (
                    <>
                        <InputDefault type='text' label='Nome' name='name' value='João Silva' handleChange={mudarInput}/>
                        <InputDefault type='email' label='E-mail' name='email' value='teste@teste.com' handleChange={mudarInput}/>
                        <InputDefault type='password' label='Senha' name='password' value='senha123' handleChange={mudarInput}/>
                        <InputDefault type='password' label='Repita a Senha' name='repassword' value='senha123' handleChange={mudarInput}/>
                        <Button variant='contained' color='secondary'>Criar Conta</Button>
                    </>
                )}

                { mode === 'login' && (
                    <>
                        <InputDefault type='email' label='E-mail' name='email' value='teste@teste.com' handleChange={mudarInput}/>
                        <InputDefault type='password' label='Senha' name='password' value='senha123' handleChange={mudarInput}/>
                        <Button variant='contained' color='secondary'>Acessar</Button>
                    </>
                )}
                
            </Stack>
            <Box marginTop={3}>
                { mode === 'login' && ( <Typography color='white' variant='subtitle2'>Não tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Cadastre-se</Typography></Typography> )}
                { mode === 'signup' && ( <Typography color='white' variant='subtitle2'>Já tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography> )}
            </Box>
        </>

    )
}

export { Form }