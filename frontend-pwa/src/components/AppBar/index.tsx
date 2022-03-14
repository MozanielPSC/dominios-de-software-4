import React from 'react';

import  { Container, Toolbar, Typography, AppBar } from "@mui/material";

export type MyAppBarProps = {
  title: string
}

const MyAppBar: React.FC<MyAppBarProps> = ({ title } : MyAppBarProps) => {

  return (
    <AppBar position='static'>
      <Container>
          <Toolbar disableGutters>
          <Typography
              variant="h6"
              noWrap
              component="div"
          >
              {title}
          </Typography>

          </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MyAppBar;
