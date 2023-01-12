import React, { useEffect, useState } from 'react';
import { InputDefault, InputName } from '../InputDefault';
import { Stack, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { buscarUsuarios, saveUser } from '../../store/modules/users/usersSlice';
import { setUsuarioLogado } from '../../store/modules/userLogged/userLoggedSlice';
import { setarRecados } from '../../store/modules/contatos/contatosSlice';
import { Contato } from '../../store/modules/typeStore';


export interface FormProps {
  mode: 'login' | 'signup';
}

function Form({ mode }: FormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [showErrorFeedback, setShowErrorFeedback] = useState(false);
    const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
    const usersRedux = useAppSelector(buscarUsuarios); // get - traz as infos de users da store
    const { loading, mensagem, success } = useAppSelector((state) => state.users);
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch(); // cria-se uma variavel que recebe o retorno da execução do useAppDispatch
    
    useEffect(() => {
        if(!loading && !success && mode === 'signup') {
            setShowErrorFeedback(true)
        } else {
            setShowErrorFeedback(false)
        }


        if(!loading && success && mode === 'signup') {
            setShowSuccessFeedback(true)
        } else {
            setShowSuccessFeedback(false)
        }
    }, [mode, loading, success, mensagem])

    useEffect(() => {
        if(showSuccessFeedback && mensagem ) {
            setTimeout(() => {
                navigate('/')
            }, 2000)

            clearInputs();
        }
    }, [navigate, showSuccessFeedback, mensagem])
    

    const handleValidateInput = (value: string, key: InputName) => {
        switch(key) {
            case 'name':
                if(value.length < 3) {
                    setErrorName(true);
                } else {
                    setErrorName(false);
                }
            break;

            case 'email':
                // eslint-disable-next-line no-useless-escape
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if(!value.match(regexEmail)) {
                    setErrorEmail(true)
                }else {
                    setErrorEmail(false)
                }
            break;

            case 'password':
                if(mode === 'signup') {
                    if(!value || value.length < 6) {
                        setErrorPassword(true)
                        
                    } else {
                        setErrorPassword(false)
                    }
                }

                if(mode === 'login') {
                    if(!value){
                        setErrorPassword(true)
                    } else {
                        setErrorPassword(false)
                    }
                }
            break;

            case 'repassword':
                if(value !== password) {
                    setErrorPassword(true)
                } else {
                    setErrorPassword(false)
                }
            break

            default:
        }
    }

    const mudarInput = (value: string, key: InputName) => {
        switch(key) {
            case 'name':
                setName(value)
                handleValidateInput(value, key)
            break;

            case 'email':
                setEmail(value)
                handleValidateInput(value, key)
            break;

            case 'password':
                setPassword(value)
                handleValidateInput(value, key)
            break;

            case 'repassword':
                setRepassword(value)
                handleValidateInput(value, key)
            break

            default:
        }
    }

    const handleNavigate = () => {
        if(mode === 'login') {
            navigate('/signup')
        } else {
            navigate('/')
        }
    }


    const createAccount = () => {
        const newUser = {
            name,
            email,
            password
        }

        dispatch(saveUser(newUser));
    }

    const login = () => {
        const userExist = usersRedux.find((user) => user.email === email && user.password === password);

        if(!userExist) {
           const confirma = window.confirm("Usuário não cadastrado. Deseja cadastrar uma conta? ")

           if(confirma) {
                navigate('/signup')
           }
        }
        
        dispatch(setUsuarioLogado({ id: userExist!.id, name: userExist!.name, email: userExist!.email, password: userExist!.password }))
        dispatch(setarRecados(userExist?.contacts as Contato[]))
        
        alert('Login efetuado com sucesso! Redirecionando...')
        setTimeout(() => {
            navigate('/home')
        }, 1500)
    }

    const clearInputs = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRepassword('');
    }

    return (
        <>
            <Stack direction="column" spacing={2} sx={{width: '80%'}}>
                { mode === 'signup' && (
                    <>
                        <InputDefault type='text' label='Nome' name='name' value={name} handleChange={mudarInput} color={errorName ? 'error' : 'secondary'}/>
                        <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'secondary'}/>
                        <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'secondary'}/>
                        <InputDefault type='password' label='Repita a Senha' name='repassword' value={repassword} handleChange={mudarInput} color={errorPassword ? 'error' : 'secondary'}/>
                        <Button disabled={errorName || errorEmail || errorPassword || loading } variant='contained' color='secondary' onClick={createAccount} startIcon={loading ? <CircularProgress /> : null}>Criar Conta</Button>
                    </>
                )}

                { mode === 'login' && (
                    <>
                        <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'secondary'}/>
                        <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'secondary'}/>
                        <Button disabled={errorEmail || errorPassword} variant='contained' color='secondary' onClick={login}>Acessar</Button>
                    </>
                )}
                
            </Stack>
            <Box marginTop={3}>
                { mode === 'login' && ( <Typography color='white' variant='subtitle2'>Não tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Cadastre-se</Typography></Typography> )}
                { mode === 'signup' && ( <Typography color='white' variant='subtitle2'>Já tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography> )}
            </Box>
            <Box marginTop={3}>
                { showErrorFeedback && mensagem && ( <Typography color='error' variant='subtitle2'>{ mensagem }</Typography> )}
                { showSuccessFeedback && mensagem && ( 
                    <React.Fragment>
                        <Typography color='green' variant='subtitle2'>{ mensagem } 🎉</Typography>
                        <Typography color='green' variant='subtitle2'>Você será redirecionado...</Typography>
                    </React.Fragment> 
                )}
            </Box>
        </>

    )
}

export { Form }