import React, { useState } from 'react';

import  { DialogContent, DialogContentText, DialogActions, Button,
   Toolbar, Typography, AppBar, Box, Dialog, DialogTitle
 } from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBack';
import Logout from '@mui/icons-material/Logout';

import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/auth';

export type MyAppBarProps = {
  title: string
  back?: boolean
  backUrl?: string
}

const MyAppBar: React.FC<MyAppBarProps> = ({ title, back = false, backUrl = '' } : MyAppBarProps) => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const [showModal, setShowModal] = useState(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
        {back && (<ArrowBack onClick={() => { navigate(backUrl) }} style={{marginRight: '15'}} />)}
          <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
          >
              {title}
          </Typography>
          <Logout onClick={() => { setShowModal(true) }}  />
        </Toolbar>
      </AppBar>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <DialogTitle id="alert-dialog-title">
          Deseja realmente sair?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Uma vez confirmado, será necessário logar novamente para continuar acessar o aplicativo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button onClick={() => {
            signOut()
            navigate('/')
          }} autoFocus>
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MyAppBar;
