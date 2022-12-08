import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [userLogged, setUserLogged] = useState('');

    useEffect(
        () => {
            const usuarioLogado = localStorage.getItem('usuarioLogado');

            if(!usuarioLogado) {
                navigate('/')
            } else {
                setUserLogged(usuarioLogado);
            }


            return () => {
                console.log('DESMONTOU')
            }
        },

       
        [navigate]
    )
    return (<h1>HELLOW, {userLogged}</h1>)
}


export { Home }