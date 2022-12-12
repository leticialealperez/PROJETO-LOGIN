import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerImage } from '../../components/BannerImage';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';
import { User } from '../../config/types';

function Login() {
    const navigate = useNavigate();
    const [userLogged, setUserLogged] = useState<User | null>(JSON.parse(localStorage.getItem('usuarioLogado') ?? 'null'));

    useEffect(
        () => {

            if(userLogged) {
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