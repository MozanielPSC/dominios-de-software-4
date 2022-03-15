import React from 'react';

import AppBar from '../../components/AppBar';

import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material'

import CheckIcon from '@mui/icons-material/Check';
import TruckIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/PendingActions';

import { useNavigate } from "react-router-dom";

const MyRoutes: React.FC = () => {

  const navigate = useNavigate()

  return (
    <>
      <AppBar title="Meus trajetos" />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem onClick={() => {
          navigate('/routes/34', { replace: true })
        }}>
          <ListItemAvatar>
            <Avatar>
              <TruckIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Entrega de barris de soja"
            secondary="Goiânia - São Paulo"
          />
        </ListItem>
        <ListItem onClick={() => {
          navigate('/routes/34', { replace: true })
        }}>
          <ListItemAvatar>
            <Avatar>
              <CheckIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Entrega de materiais de construção"
            secondary="Goiânia - São Paulo"
          />
        </ListItem>
        <ListItem onClick={() => {
          navigate('/routes/34', { replace: true })
        }}>
          <ListItemAvatar>
            <Avatar>
              <PendingIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Entrega de materiais de construção"
            secondary="Goiânia - São Paulo"
          />
        </ListItem>
        <ListItem onClick={() => {
          navigate('/routes/34', { replace: true })
        }}>
          <ListItemAvatar>
            <Avatar>
              <PendingIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Entrega de materiais de construção"
            secondary="Goiânia - São Paulo"
          />
        </ListItem>
        <ListItem onClick={() => {
          navigate('/routes/34', { replace: true })
        }}>
          <ListItemAvatar>
            <Avatar>
              <PendingIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Entrega de materiais de construção"
            secondary="Goiânia - São Paulo"
          />
        </ListItem>
      </List>
    </>

  )
}

export default MyRoutes;
