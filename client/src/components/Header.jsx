
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ProtectedLayout } from '../layouts/ProtectedLayaut';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';


const drawerWidth = 240;

export default function Header() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <Typography variant="h6" noWrap component="div">
            Projects Manager
          </Typography>
          <TextField
          id="outlined-basic"
          // label="Search field"
          placeholder='Buscar Proyectos...'
          type="search"
          variant="outlined"
          sx={{
            backgroundColor: 'white',
            marginLeft: '20px',
            width: '50%',
            minWidth: '200px'        
          }}
        />
        <Button variant="outlined"
        sx={{
          backgroundColor: 'white',
        }}
        >
          Cerrar sesion
        </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Sidebar/>
          <Divider />
          <List>
            {['All Projects', 'My proyects', 'collabs'].map((text, index) => (
              <Link to={text === 'All Projects'? '/projects' : text === 'My proyects'? '#My_projects' : '#collabs'} key={text}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          {/* <List>
            {['Send email', 'All mail'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
      <Box component="main" sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        minHeight: '700px',
        flexGrow: 1,
        p: 3 
        }}>
        <Toolbar />
        <ProtectedLayout/>
      </Box>
    </Box>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Header = () => {
//   return (
//     <div>
//         <div>
//             <h2>Projects Manager</h2>
//             <input type={'text'} placeholder="Buscar Proyectos..."/>
//             <div>
//                 <Link to={"/projects"}>
//                     PROYECTOS
//                 </Link>
//                 <button type='button' /* onClick={closeSession} */>cerrar sesion</button>
//             </div>
//         </div>
//     </div>
//   )
// }
