import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../config/types';

function Home() {
    const navigate = useNavigate();
    const [userLogged, setUserLogged] = useState<User | undefined>(JSON.parse(localStorage.getItem('usuarioLogado') ?? 'undefined'));

    useEffect(
        () => {

            if(!userLogged) {
                navigate('/')
            } 

            return () => {
                console.log('DESMONTOU home')
            }
        },

       
        [navigate, userLogged]
    )
    return (<h1>HELLOW, {userLogged?.name}</h1>)
}


export { Home }