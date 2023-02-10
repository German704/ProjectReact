import React, { useState, useEffect} from 'react';
import {Box, Button, Stack, TextField} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alerts } from '../components/Alerts';
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2';

export default function RecoverPassword() {
  const [alert, setAlert] = useState({});
  const [pass, setPass] = useState("");
  const [tokenCheck, setTokenCheck] = useState(false);

  const navigate = useNavigate();
  const {token} = useParams();

  const handleShowAlert = (msg) => {
    setAlert({
     msg
    });
 }

 useEffect(() => {
  const checkToken = async () => {
    try {
      const {data} = await clientAxios.get(`/auth/reset-Pass?token=${token}`);
      console.log(data.msg);
      setTokenCheck(true);

    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
    }
  }

  checkToken();
 }, [])

 const handleSubmit = async (e) => {
  e.preventDefault();

  if(!pass){
    handleShowAlert("Debe ingresar su nueva contraseña");
    return null;
  }

  try {
    
    const {data} = await clientAxios.post(`/auth/reset-Pass?token=${token}`, {
      pass
    });
  
    Swal.fire({
      icon: 'success',
      title: 'Felicidades!',
      text: data.msg,
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    }).then(result => {
      if(result.isConfirmed){
        navigate('/');
      }
    });

    setPass("");

  } catch (error) {
    console.error(error);
    handleShowAlert(error.response?.data.msg);
    setPass("");
  }
 };

  return (
    <>
    <Box
      sx={{
        width: 340,
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        m:'0 10px 0 0',
        padding: '0px 20px',
        '& .MuiTextField-root': { m: 1, width: '31ch' },
      }}      
    >
      <h1>Reestablecer Contraseña</h1>
      {
        alert.msg && <Alerts {...alert}/>
      }
      {
        tokenCheck &&
        (
          <Box
            component="form"
            sx={{
              width: 340,
              display:'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              backgroundColor: 'white',
              m:'0 10px 0 0',
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
    
      <div className='containerDiv'>
        <TextField
          required
          id="standard-password-input"
          label="Nueva Contraseña"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={pass}
          name="pass"
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
        <Stack spacing={2} direction="row" mt={'10px'} mb={'10px'}>
        <Button type='submit' variant="contained">Guardar</Button>
        </Stack>
        
        </Box> 
        )
      }
      </Box>
    </>
  );
}