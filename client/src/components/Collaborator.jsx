import { Button } from '@mui/material'
import React from 'react'

export const Collaborator = () => {
  return (
    <div className='CollabMember'>
        <p>
            Nombre del colaborador
            <span> | Email</span>
        </p>
        <div>
            <Button type='button' variant='outlined'/* onClick={HandleDelete} */ sx={{
              ":hover": {
                backgroundColor: "red",
                color: 'white'
            }}}>Eliminar</Button>
        </div>
    </div>
  )
}
