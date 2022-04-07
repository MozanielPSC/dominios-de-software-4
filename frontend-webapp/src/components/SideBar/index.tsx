import { Menu, Power } from '@mui/icons-material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import TimelineIcon from '@mui/icons-material/Timeline';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';


export function Sidebar() {
  const [isSidebarShowing, setIsSideBarShowing] = useState(false)
  const {signOut} = useAuth()
  const navigate = useNavigate()

  const toggleSidebar =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setIsSideBarShowing(open);
      };

 

  return (
    <>
      <Button onClick={toggleSidebar(true)}><Menu/></Button>
      <Drawer
        anchor='left'
        open={isSidebarShowing}
        onClose={toggleSidebar(false)}
      >
        <List>
          <ListItem button key='active-routes' onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button key='active-routes' onClick={() => navigate('/active-routes')}>
            <ListItemIcon>
              <AltRouteIcon />
            </ListItemIcon>
            <ListItemText primary='Rotas Ativas' />
          </ListItem>
          <ListItem button key='logout' onClick={signOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Sair' />
          </ListItem>
      </List>
      </Drawer>
    </>
  )
}