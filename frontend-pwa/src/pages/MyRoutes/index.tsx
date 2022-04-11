import React, { useState, useEffect, useCallback } from 'react';

import AppBar from '../../components/AppBar';

import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material'

import TruckIcon from '@mui/icons-material/LocalShipping';

import { useNavigate } from "react-router-dom";

import { api } from '../../service/api';
import { useAuth } from '../../hooks/auth';

import {  toast } from 'react-toastify';

export type Path = {
  id: string;
  city_initial: string;
  city_final: string;
  state_initial: string;
  state_final: string;
  driver: string;
  isComplete: boolean
  isFinal: boolean
  isInitial: boolean
  city_name: string
}

export type Route = {
  id: string;
  driver_id: string;
  enterprise_id: string;
  initialDate: Date;
  expectedEnd?: Date;
  isFinished: boolean;
}

export type EnrichedRoute = Route & {
  paths: Path[]
}

const MyRoutes: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [enrichedRoutes, setEnrichedRoutes] = useState<EnrichedRoute[]>([]);
  const { user } = useAuth()

  const navigate = useNavigate()

  const getPaths = useCallback(async (routeId: string) => {
    return await api.get<Path[]>(`paths/byRoute/${routeId}`);
  }, [])

  const getRoutes = useCallback(async () => {
      try {
          const response = await api.get<Route[]>(`/routes/byDriver/${user.id}`)
          const enrichedRoutes = []
          for(const route of response.data) {
            const paths = await getPaths(route.id)
            const orderedPaths = orderPaths(paths.data)
            enrichedRoutes.push({
              ...route,
              paths: orderedPaths
            })
          }
          setEnrichedRoutes(enrichedRoutes)
      } catch (error) {
        toast.error('Ocorreu um erro ao carregar suas rotas, tente mais tarde novamente.')
      } finally {
          setLoading(false);
      }
  }, [getPaths])

  const orderPaths = (paths: Path[]) => {
    let ordered = [...paths].filter(item => !item.isFinal && !item.isInitial)
    const final = paths.find(path => path.isFinal)
    const initial = paths.find(path => path.isInitial)

    if(final) {
      ordered.push(final)
    }

    if(initial) {
      ordered.unshift(initial)
    }

    return ordered
  }

  useEffect(() => {
    getRoutes()
  }, [getRoutes])

  return (
    <>
      <AppBar title="Meus trajetos" />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {enrichedRoutes.map((route: EnrichedRoute) => {
            return (
              <ListItem onClick={() => {
                navigate(`/routes/${route.id}`)
              }}>
                <ListItemAvatar>
                  <Avatar>
                    <TruckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={`${route.paths[0].city_name} - ${route.paths[route.paths.length - 1].city_name}`}
                />
              </ListItem>
            )
          })
        }
      </List>
    </>

  )
}

export default MyRoutes;
