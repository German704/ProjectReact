import React, { useState } from 'react';
import {Box, Button, Stack, TextField} from '@mui/material';
import { Link } from 'react-router-dom';
import { UseForm } from '../hooks/UseForm';
import { Alerts } from '../components/Alerts';
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2';

export default function Register() {

  const [alert, setAlert] = useState({});
  let state = {
    name: false,
    lastName: false,
    email: false,
    pass: false,
    pass2: false
  };
  const [errorValue, setErrorValue] = useState(state);
  const regExLetter = /^[A-Z]+$/i;
  const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;    
  const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

  const funcValidate = (obj) => {
    let arr = Object.values(obj);
    if(arr.includes(true)){
      return true
    }else{
      return false
    }
  }

  const {formValues, handleInputChange, reset} = UseForm({
    name: "",
    lastName: "",
    email: "",
    pass: "",
    pass2: ""
  });

  const {name, lastName, email, pass, pass2} = formValues;

  const handleSubmt = async (e) => {
    e.preventDefault();
    

    if([name, lastName, email, pass, pass2].includes("")){
      handleShowAlert('Todos los campos son obligatorios');
      setErrorValue({
        name: true,
        lastName: true,
        email: true,
        pass: true,
        pass2: true
      });
      funcValidate(errorValue)
      return null
    };
    if(!regExLetter.test(name)){
      handleShowAlert('Solo se aceptan letras');
      errorValue.name = true;
      funcValidate(errorValue)
      return null
    };
    if(!regExLetter.test(lastName)){
      handleShowAlert('Solo se aceptan letras');
      errorValue.lastName = true;
      funcValidate(errorValue)
      return null
    };
    if(!regExEmail.test(email)){
      handleShowAlert('Email invalido');
      errorValue.email = true
      funcValidate(errorValue)
      return null
    };
    if(!regExPass.test(pass)){
      handleShowAlert('La contraseña debe tener mayuscula, minusculas y numeros');
      errorValue.pass = true
      funcValidate(errorValue)
      return null
    };
    if(pass !== pass2){
      handleShowAlert('La contraseñas no coinciden');
      errorValue.pass2 = true
      funcValidate(errorValue)
      return null
    };

    try {
      
      const {data} = await clientAxios.post('/auth/register', {
        name,
        lastName,
        email,
        pass,
      });
      // console.log(data);

      Swal.fire({
        icon: 'info',
        title: 'Gracias por Registrarte!',
        text: data.msg,
      });
      reset();

    } catch (error) {
      console.error(/* 'Register error =>', */ error);
      handleShowAlert(error.response.data.msg);
      reset()
    }
  };

  const handleShowAlert = (msg) => {
     setAlert({
      msg
     });
     setTimeout(() => {
      setAlert({});
      setErrorValue(state);
     }, 5000);
  }

  return (
    <>
    <Box
      component="form"
      onSubmit={handleSubmt}
      sx={{
        width: 340,
        // border: '1px dashed grey',
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        // opacity: 0.5,
        m:'0 10px 0 0',
        padding: '0px 20px',
        '& .MuiTextField-root': { m: 1, width: '31ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <h1>Registrarse</h1>

      {
        alert.msg && <Alerts {...alert}/>
      }

      <div className='containerDiv'>
        <TextField
          error={errorValue.name}
          required
          id="standard-required"
          label="Nombre"
          variant="standard"
          value={name}
          name="name"
          onChange={handleInputChange}
        />
        <TextField
          error={errorValue.lastName}
          required
          id="standard-required2"
          label="Apellido"
          variant="standard"
          value={lastName}
          name="lastName"
          onChange={handleInputChange}
        />
        <TextField
          error={errorValue.email}
          required
          id="standard-required3"
          label="Email"
          type={'email'}
          variant="standard"
          value={email}
          name="email"
          onChange={handleInputChange}
        />
        <TextField
          error={errorValue.pass}
          required
          id="standard-password-input"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={pass}
          name="pass"
          onChange={handleInputChange}
        />
        <TextField
          error={errorValue.pass2}
          required
          id="standard-password-input2"
          label="Repetir Contraseña"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={pass2}
          name="pass2"
          onChange={handleInputChange}
        />
      </div>
      <Stack spacing={2} direction="row" mt={'10px'} mb={'10px'}>
        <Button type='submit' id='btn' disabled={funcValidate(errorValue)} variant="contained">Registrarme</Button>
      </Stack>
    <nav className='navContainer'>
        <Link to={'/'}>Ya tienes una cuenta? inicia sesion</Link>
    </nav>
    </Box>
    </>
  );
}