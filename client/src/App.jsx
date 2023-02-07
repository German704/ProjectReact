import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import {AuthLayout} from './layouts/AuthLayout'
import { ProtectedLayout } from './layouts/ProtectedLayaut'
import { ConfirmAccount } from './pages/ConfirmAccount'
import ForgetPassword from './pages/ForgetPassword'
import Login from './pages/Login'
import { Projects } from './pages/projects'
import RecoverPassword from './pages/RecoverPassword'
import Register from './pages/Register'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={<AuthLayout/>}
        >
          <Route
            index
            element={<Login/>}
          />
          <Route
            path='/Register'
            element={<Register/>}
          />
          <Route
            path='/forget-password'
            element={<ForgetPassword/>}
          />
          <Route
            path='/recover-pass/:token'
            element={<RecoverPassword/>}
          />
          <Route
            path='/confirm-account/:token'
            element={<ConfirmAccount/>}
          />
          <Route
            path='*'
            element={<h1>404 Not fount</h1>}
          />
        </Route>
        <Route
          path='/projects'
          element={<ProtectedLayout/>}
        >
          <Route
            index
            element={<Projects/>}
          />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
