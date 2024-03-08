import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/contexts';
import Toast from './toast';
export default function GuestLayout() {
    const {userToken } = useStateContext();
    if(userToken){
        return <Navigate to='/home' />
    }
    
    return (
    <div>
        
        <Outlet/>
        <Toast/>
    </div>
    )
}
