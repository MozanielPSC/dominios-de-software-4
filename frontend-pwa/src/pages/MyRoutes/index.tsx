import React, { useState } from 'react';

import AppBar from '../../components/AppBar';

import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material'

import CheckIcon from '@mui/icons-material/Check';
import TruckIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/PendingActions';

import { useNavigate } from "react-router-dom";

export type Route = {
  id: number
  description: string
  location: string
}

const MyRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([{
    id: 34,
    description: "Entrega de barris de soja",
    location: "Goiânia - São Paulo"
  }])

  const navigate = useNavigate()

  return (
    <>
      <AppBar title="Meus trajetos" />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          routes.map(route => (
            <ListItem onClick={() => {
              navigate(`/routes/${route.id}`, { replace: true })
            }}>
              <ListItemAvatar>
                <Avatar>
                  <TruckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={route.description}
                secondary={route.location}
              />
            </ListItem>
          ))
        }
      </List>
    </>

  )
}

export default MyRoutes;
