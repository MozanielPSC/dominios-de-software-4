import { Inbox, Mail, Menu } from '@mui/icons-material';
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";


export function Sidebar() {
  const [isSidebarShowing, setIsSideBarShowing] = useState(false)

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

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleSidebar(true)}><Menu/></Button>
      <Drawer
        anchor='left'
        open={isSidebarShowing}
        onClose={toggleSidebar(false)}
      >
        {list()}
      </Drawer>
    </>
  )
}