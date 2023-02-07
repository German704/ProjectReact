import React, {useState} from 'react';
import {Box, Button, Stack, TextField, useForkRef} from '@mui/material';
import { Link } from 'react-router-dom';
import { Alerts } from '../components/Alerts';
import { UseForm } from '../hooks/UseForm';
import { clientAxios } from '../config/clientAxios';
import useAuth from '../hooks/UseAuth';
import Swal from 'sweetalert2';

export default function Login() {
  const [alert, setAlert] = useState({});
  const {setAuth} = useAuth();

  const handleShowAlert = (msg, time = true) => {
    setAlert({
     msg
    });

    if(time){
      setTimeout(() => {
        setAlert({});
      }, 5000);
    }
    reset();
  }

  const {formValues, handleInputChange, reset} = UseForm({
    email: "",
    pass: ""
  });

  const {email, pass} = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, pass].includes("")){
      handleShowAlert("Todos los campos son obligatorios");
      return null
    }

    try {
      const {data} = await clientAxios.post('/auth/login', {
        email,
        pass,
      });
      console.log(data);

      setAuth(data.user);
      sessionStorage.setItem('token', data.token);

      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion Exitoso!',
        text: data.msg,
      });
      reset();

    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
    }
  }

  return (
    <>
    <Box
      component="form"
      sx={{
        width: 340,
        // border: '1px dashed grey',
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        // opacity: 0.5,
        m:'0 10px 0 0',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>Inicio de Sesion</h1>
      {
        alert.msg && <Alerts {...alert}/>
      }
      <div className='containerDiv'>
        <TextField
          required
          id="standard-required"
          label="Email"
          variant="standard"
          value={email}
          name="email"
          onChange={handleInputChange}
        />
        <TextField
          required
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={pass}
          name="pass"
          onChange={handleInputChange}
        />
      </div>
        <Stack spacing={2} direction="row" mt={'10px'} mb={'10px'}>
        <Button type='submit' variant="contained">Login</Button>
        </Stack>
    <nav className='navContainer'>
      <Link to={'/register'}>No tenes cuenta? Registrate</Link>
      <Link to={'/forget-password'}>Olvide mi contraseña</Link>
    </nav>
    </Box>
    </>
  );
}