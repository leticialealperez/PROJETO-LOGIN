import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerImage } from '../../components/BannerImage';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUsers } from '../../store/modules/users/usersSlice';

function Login() {
    const navigate = useNavigate();
    const disptach = useAppDispatch();
    const userLogged = useAppSelector((state) => state.userLogged)

    useEffect(() => {
        disptach(getUsers())
    }, [])

    useEffect(
        () => {

            if(userLogged.email) {
                navigate('/home')
            } 

            return () => {
                console.log('DESMONTOU login')
            }
        },

       
        [navigate, userLogged]
    )
    return (
        <WrapperContent>
            <BannerImage />
            <ContainerForm>
                <Form mode='login'/>
            </ContainerForm>
        </WrapperContent>
    )
}

export { Login }