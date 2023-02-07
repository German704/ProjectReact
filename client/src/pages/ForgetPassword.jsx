import React, { useState } from 'react';
import {Box, Button, Stack, TextField} from '@mui/material';
import { Link } from 'react-router-dom';
import { Alerts } from '../components/Alerts';
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2';


export default function ForgetPassword() {

  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email){
      handleShowAlert("Debe ingresar su Email");
      return null
    }

    try {
      const {data} = await clientAxios.post(`/auth/sendToken`,{
        email
      });

      Swal.fire({
        icon: 'info',
        title: 'Revisa tu correo!',
        text: data.msg,
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      });

      setEmail("");
    } catch (error) {
      // console.error(error)
      handleShowAlert(error.response?.data.msg);
    }
  }

  const handleShowAlert = (msg) => {
    setAlert({
     msg
    });
    setTimeout(() => {
     setAlert({});
    }, 5000);
 }
  return (
    <>
    <Box
      component="form"
      sx={{
        width: 350,
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        // m:'0 10px 0 0',
        '& .MuiTextField-root': { m: 1, width: '30ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>Recuperar acceso</h1>

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
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        <Stack spacing={2} direction="row" mt={'10px'} mb={'10px'}>
        <Button type='submit' variant="contained">Recuperar Contraseña</Button>
        </Stack>
    <nav className='navContainer'>
      <Link to={'/register'}>No tenes cuenta? Registrate</Link>
      <Link to={'/'}>Ya tienes una cuenta? inicia sesion</Link>
    </nav>
    </Box>
    </>
  );
}