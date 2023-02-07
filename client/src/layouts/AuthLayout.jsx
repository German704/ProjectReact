import React from 'react'
import {Outlet} from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <>
      <main>
        <div className='flexDiv'>
            <Outlet/>
        </div>
      </main>
    </>
  )
}
