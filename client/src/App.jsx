import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import { AuthProvider } from './context/AuthProvider'
import { ProjectsProvider } from './context/ProjectsProvider'
import {AuthLayout} from './layouts/AuthLayout'
// import { ProtectedLayout } from './layouts/ProtectedLayaut'
import { ConfirmAccount } from './pages/ConfirmAccount'
import ForgetPassword from './pages/ForgetPassword'
import Login from './pages/Login'
import { ProjectAdd } from './pages/ProjectAdd'
import { ProjectDetail } from './pages/ProjectDetail'
import { ProjectEdit } from './pages/ProjectEdit'
import { Projects } from './pages/projects'
import RecoverPassword from './pages/RecoverPassword'
import Register from './pages/Register'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <ProjectsProvider>
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
          element={<Header/>}
        >
          <Route
            index
            element={<Projects/>}
          />
          <Route
            path='/projects/create-project'
            element={<ProjectAdd/>}
          />
          <Route
            path='/projects/edit-project/:id'
            element={<ProjectEdit/>}
          />
          <Route
            path='/projects/:id'
            element={<ProjectDetail/>}
          />
        </Route>
      </Routes>
      </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
