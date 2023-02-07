import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import useAuth from '../hooks/UseAuth';

export const ProtectedLayout = () => {
  const {auth, loading} = useAuth();

  if(loading){
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <>
    {
        auth._id ? (
      <main>
        <div className='flexDiv'>
            <Outlet/>
        </div>
      </main>
        )
        :
        (
        <Navigate to={"/"}/>
        )
    }
    </>
  )
}