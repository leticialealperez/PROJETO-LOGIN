import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../config/types';

function Home() {
    const navigate = useNavigate();
    const [userLogged, setUserLogged] = useState<User | null>(JSON.parse(localStorage.getItem('usuarioLogado') ?? 'null'));

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