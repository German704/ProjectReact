import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className='sidebar'>
        <h3>Hola: Nombre xx</h3>
        <Link to={"/projects/create-project"}>
        <Button type='button' variant="outlined" sx={{
            ":hover": {
              backgroundColor: "deepskyblue",
              color: 'darkBlue'
          }
        }}>
          <AddIcon/> Nuevo proyecto
        </Button>
        </Link>
    </aside>
  )
}
