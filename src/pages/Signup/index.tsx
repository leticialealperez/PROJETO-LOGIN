import React, { useEffect } from 'react';
import { BannerImage } from '../../components/BannerImage';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';
import { useAppDispatch } from '../../store/hooks';
import { clearProperties } from '../../store/modules/users/usersSlice';

function Signup() {

    const dispatch = useAppDispatch();

    useEffect(() => {

        return () => {
            dispatch(clearProperties())
        }
    }, [dispatch])
    return (
        <WrapperContent>
            <BannerImage />
            <ContainerForm>
                <Form mode='signup'/>
            </ContainerForm>
        </WrapperContent>
    )
}

export { Signup }