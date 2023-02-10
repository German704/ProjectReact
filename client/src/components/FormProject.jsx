import React, { useEffect, useRef } from 'react'
import {Box, Button, Stack, TextField} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { UseForm } from '../hooks/UseForm';
import { UseProjects } from '../hooks/UseProjects';
import { Alerts } from './Alerts';

export const FormProject = ({linkC}) => {
  const {alert, loading, storeProject, showAlert, oneProject} = UseProjects();
  const {id} = useParams();

  // const inputName = useRef(null);
  // const inputDescription = useRef(null);
  // const inputDateExpire = useRef(null);
  // const inputClient = useRef(null);
  
  const {formValues, handleInputChange, reset, setFormValues} = UseForm({
    name: oneProject.name && id? oneProject.name : "",
    description: oneProject.description  && id? oneProject.description : "",
    dateExpire: oneProject.dateExpire  && id? oneProject.dateExpire.substring(0,10) : "",
    client: oneProject.client  && id? oneProject.client : ""
  });
  
  let {name, description, dateExpire, client} = formValues;

  useEffect(() => {
    if(id){
    // const {name, description, dateExpire, client} = oneProject;
    // inputName.current.value = oneProject.name;
    // inputDescription.current.value = oneProject.description;
    // inputDateExpire.current.value = oneProject.dateExpire && oneProject.dateExpire.substring(0,10);
    // inputClient.current.value = oneProject.client;

    name = oneProject.name;
    description = oneProject.description;
    dateExpire = oneProject.dateExpire.substring(0,10);
    client = oneProject.client;
    }
  }, [id]);
  
  const handleSubmt = (e) => {
    e.preventDefault();

    if([name, description, dateExpire, client].includes("")){
      showAlert('Todos los campos son obligatorios');
      return null;
    };
    
    storeProject({
      id: id ? id : null,
      name,
      description,
      dateExpire,
      client
    });
  
  }

  return (
    <>
    <Box
      component="form"
      onSubmit={handleSubmt}
      sx={{
        width: '100%',
        display:'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m:'0 auto',
        '& .MuiTextField-root': { m: 1, width: '31ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {
        alert.msg && <Alerts {...alert}/>
      }

      <div className='containerDiv'>
        <TextField
          error={false}
          required
          id="standard-required"
          label="Nombre del Proyecto"
          variant="standard"
          value={name}
          name="name"
          onChange={handleInputChange}
          // ref={inputName}
        />
        <TextField
          error={false}
          required
          id="standard-required2"
          label="Descripción"
          /* variant="standard" */
          multiline
          rows={4}
          value={description}
          name="description"
          onChange={handleInputChange}
          // ref={inputDescription}
        />
        <TextField
          error={false}
          required
          id="standard-required3"
          // label="Fecha de Entrega"
          type={'date'}
          variant="standard"
          value={dateExpire}
          name="dateExpire"
          onChange={handleInputChange}
          // ref={inputDateExpire}
        />
        <TextField
          /* error={errorValue.pass} */
          required
          id="standard-password-input"
          label="Nombre del Cliente"
          type="text"
          variant="standard"
          value={client}
          name="client"
          onChange={handleInputChange}
          // ref={inputClient}
        />
      </div>
      <Stack spacing={2} direction="row" mt={'10px'} mb={'10px'}>
        <Button type='submit' id='btn' /* disabled={funcValidate(errorValue)} */ variant="contained">{id ? 'Actualizar' : 'Guardar'}</Button>
        <Link to={`${linkC}`} ><Button type='button' id='btn-C' variant="contained">Cancelar</Button></Link>
      </Stack>
    </Box>
    </>
  )
}
