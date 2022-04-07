import { Menu, Power } from '@mui/icons-material';
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useAuth } from '../../hooks/auth';


export function Sidebar() {
  const [isSidebarShowing, setIsSideBarShowing] = useState(false)
  const {signOut} = useAuth()

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
          <ListItem button key='logout' onClick={signOut}>
            <ListItemIcon>
              <Power/>
            </ListItemIcon>
            <ListItemText primary='Log out' />
          </ListItem>
      </List>
      </Drawer>
    </>
  )
}