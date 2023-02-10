import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import Header from '../components/Header';
// import { Sidebar } from '../components/Sidebar';
import useAuth from '../hooks/UseAuth';

export const ProtectedLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
    <>
      {
        auth._id ? (
          <div>
            <div>
              {/* <Sidebar /> */}
              {/* <main> */}
                <div className='protectedDiv'>
                  <Outlet />
                </div>
              {/* </main> */}
            </div>
          </div>
        )
          :
          (
            <Navigate to={"/"} />
          )
      }
    </>
  )
}