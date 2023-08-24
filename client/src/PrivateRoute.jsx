// PrivateRoute.js
import React from 'react';
import { useContext } from 'react';
import { Route,  useNavigate, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './userContext';

export const PrivateRoute = () => {

    const {id,pending}=useContext(UserContext);

    if(pending){
        console.log(`pending`);

      
        return <div>loading</div>
    }

    return id ? <Outlet /> : <Navigate to="/login" />;
}
