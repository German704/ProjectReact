import { Button } from '@mui/material'
import React from 'react'

export const Task = ({name, description, dateExpire, priority}) => {

  return (
    <div className="task">
        <div className='taskInfo'>
            <div>
              <h3>{name}</h3>
              <span>{` | ${dateExpire}`}</span>
              <span className={priority === 'Baja' ? 'priorityA' : priority === 'Media' ? 'priorityB' : 'priorityC'}>{` | ${priority}`}</span>
            </div>
              <p>{description}</p>
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
