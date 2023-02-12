import React, { Fragment } from 'react';
import { Dialog, Transition} from '@headlessui/react';
import {Box, Button, Stack, TextField} from '@mui/material';
import { UseProjects } from '../hooks/UseProjects';
import { UseForm } from '../hooks/UseForm';
import { Alerts } from './Alerts';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';

export const ModalFormTask = () => {
    const {id} = useParams()
    const {showModal, handleShowModal, alert, showAlert, storeTask, showAlertModal} = UseProjects();

    const {formValues, handleInputChange, reset, setFormValues} = UseForm({
        name: "",
        description: "",
        dateExpire: "",
        priority: ""
    });
      
    let {name, description, dateExpire, priority} = formValues;

    const handleClosed = () => {
        handleShowModal();
        showAlertModal("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if([name, description, dateExpire, priority].includes("")){
            showAlert("Todos los campos son obligatorios");
            return null;
        }

        storeTask({
          name,
          description,
          dateExpire,
          priority
        });

        reset()
    }

  return (
    <Transition.Root show={showModal} as={Fragment} >
        <Dialog as={"div"} onClose={handleClosed} static className={styles.modalForm}>
            <div>
                <Transition.Child as={Fragment} 
                enter="ease-out duration-300"
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                >
                    <Dialog.Overlay/>
                </Transition.Child>

                <span aria-hidden="true">&#8203</span>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  enterTo='opacity-100 translate-y-0 sm:scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 translate-y-4 sm:scale-100'
                  leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                    <div>
                        <Stack spacing={2} direction="row" mt={'10px'} mb={'10px'} sx={{
                          width: '100%', m: '0', justifyContent: 'flex-end', padding: '0 20px',
                        }}>
                          <Button type='button' variant="contained" onClick={handleClosed}>Cerrar</Button>
                        </Stack>
                        <div className={styles.divContainer}>
                            <div>
                                <Dialog.Title as='h3'>Nueva Tarea</Dialog.Title>
                                <Box
                                component="form"
                                onSubmit={handleSubmit}
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

                                <div>
                                  <TextField
                                    error={false}
                                    required
                                    id="standard-required"
                                    label="Titulo de la tarea"
                                    variant="standard"
                                    value={name}
                                    name="name"
                                    onChange={handleInputChange}
                                  />
                                  <TextField
                                    error={false}
                                    required
                                    id="standard-required2"
                                    label="Descripción"
                                    multiline
                                    rows={4}
                                    value={description}
                                    name="description"
                                    onChange={handleInputChange}
                                  />
                                  <TextField
                                    error={false}
                                    required
                                    id="standard-required3"
                                    type={'date'}
                                    variant="standard"
                                    value={dateExpire}
                                    name="dateExpire"
                                    onChange={handleInputChange}
                                  />
                                  <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    // label="Prioridad"
                                    // defaultValue="Seleccione..."
                                    SelectProps={{
                                        native: true,
                                      }}
                                    name="priority"
                                    value={priority}
                                    onChange={handleInputChange}
                                  >
                                    <option value="" hidden>Seleccione</option>
                                    {['Baja', 'Media', 'Alta'].map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </TextField>
                                </div>
                                <Stack spacing={2} direction="row" mt={'10px'} mb={'10px'}>
                                  <Button type='submit' id='btn' /* disabled={funcValidate(errorValue)} */ variant="contained">{'Guardar Tarea'}</Button>
                                </Stack>
                            </Box>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
  )
}
