import { Box } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Alerts } from '../components/Alerts';
import { clientAxios } from '../config/clientAxios';

export const ConfirmAccount = () => {
  const {token} = useParams();

  const navigate = useNavigate();
  const [alert, setAlert] = useState({});

  const handleShowAlert = (msg) => {
    setAlert({
     msg
    });
    // setTimeout(() => {
    //  setAlert({});
    // }, 5000);
 }

 useEffect(() => {

  const confirmAccount = async () => {
    try {
      const {data} = await clientAxios.get(`/auth/checked?token=${token}`);

      Swal.fire({
        icon: 'success',
        title: 'Felicidades!',
        text: data.msg,
        confirmButtonText: 'Iniciar sesion',
        allowOutsideClick: false
      }).then(result => {
        if(result.isConfirmed){
          navigate('/');
        }
      });

    } catch (error) {
      // console.error(error);
      handleShowAlert(error.response?.data.msg);
    }
  }

  confirmAccount();
 }, []);


  return (
    <>
    <Box
      sx={{
        width: 350,
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        m:'0 10px 0 0',
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      // noValidate
      // autoComplete="off"
    >
      <h1>Confirmar Contraseña</h1>
      <div>
        {
          alert.msg && (
          <>
          <Alerts {...alert}/>
          <nav className='navContainer'>
            <Link to={'/register'}>No tenes cuenta? Registrate</Link>
            <Link to={'/'}>Ya tienes una cuenta? inicia sesion</Link>
          </nav>
          </>
          )
        }
      </div>
      </Box>
    </>
  )
}
