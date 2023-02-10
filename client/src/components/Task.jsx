import { Button } from '@mui/material'
import React from 'react'

export const Task = () => {
  return (
    <div className="task">
        <div>
            <p>Nombre de la tarea</p>
            <p>Descripcion de la tarea</p>
            <p>Fecha de la tarea</p>
            <p>Prioridad</p>
        </div>
        <div className='btn'>
            <Button type='button' variant="outlined" sx={{width: '126px', ":hover": {
              backgroundColor: "skyBlue",
              color: 'darkBlue'
          }}}>Editar</Button>
          {
            false ?
            (<Button type='button' variant="outlined" sx={{width: '126px', ":hover": {
              backgroundColor: "green",
              color: 'darkBlue'
          }}}>Completa</Button>)
           :
            (<Button type='button' variant="outlined" sx={{width: '126px', ":hover": {
              backgroundColor: "orange",
              color: 'darkBlue'
          }}}>Incompleta</Button>)
          }
            <Button type='button' /* onClick={}  */variant="outlined" sx={{width: '126px', ":hover": {
              backgroundColor: "red",
              color: 'white'
          }}}>Eliminar</Button>
        </div>
    </div>
  )
}
