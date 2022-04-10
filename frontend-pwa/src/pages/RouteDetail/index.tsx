import React, { useCallback, useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useParams } from 'react-router-dom'

import { Typography, Button } from '@mui/material'

import LocationIcon from '@mui/icons-material/LocationOn';

import * as S from './styles'
import { api } from '../../service/api';

import { generateMapsUrl } from '../../utils/maps';

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
  state: string
}

export type Route = {
  id: string;
  driver_id: string;
  enterprise_id: string;
  initialDate: Date;
  expectedEnd?: Date;
  isFinished: boolean;
  started: boolean
}

export type EnrichedRoute = Route & {
  paths: Path[]
}

const RouteDetail: React.FC = () => {
  const params = useParams()

  const [route, setRoute] = useState<EnrichedRoute>({} as EnrichedRoute)
  const [showCheckpointModal, setShowCheckpointModal] = useState<boolean>(false)

  const initRoute = () => {
    api.patch('routes/start', {
      route_id: params.id
    }).then(_ => {
      navigateToMap()
    })
  }

  const updateCheckpoint = (path: Path) => {
    api.patch('paths', {
      ...path,
      isComplete: true
    }).then(() => {
      if(route.paths.filter(path => !path.isComplete).length === 1) {
        api.patch(`routes/${route.id}`, {
            ...route,
            isFinished: true
        }).then(() => {
          setShowCheckpointModal(false)
          getRoute()
        })
      }
      setShowCheckpointModal(false)
      getRoute()
    })
    .catch((e) => {
      toast.error('Ocorreu um erro desconhecido, tente mais tarde novamente')
    })

  }

  const navigateToMap = () => {
    const url = generateMapsUrl(route.paths ? route.paths : [])
    window.location.href = url
  }

  const getRoute = useCallback(async () => {
      try {
        const [routeResponse, pathResponse] = await Promise.all([
          api.get<Route>(`/routes/${params.id}`),
          api.get<Path[]>(`paths/byRoute/${params.id}`)
        ]);
        setRoute({
          ...routeResponse.data,
          paths: orderPaths(pathResponse.data)
        })

      } catch (error) {
          console.log(error);
      }
    }, [params.id])

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
    getRoute()
  }, [getRoute])

  const getStatus = () => {
    if (route.started && !route.isFinished) {
      return <strong style={{color: 'blue'}}>EM ANDAMENTO</strong>
    } else if(route.isFinished) {
      return <strong style={{color: 'green'}}>CONCLUÍDA</strong>
    } else {
      return <strong style={{color: 'red'}}>NÃO INICIADA</strong>
    }
  }

  return (
    <>
      <AppBar back backUrl="/my-routes" title="Detalhes do trajeto" />
      <S.Content>
        <S.Title>STATUS</S.Title>
        <S.Text>
          {getStatus()}
        </S.Text>
        <S.Title>TRAJETO</S.Title>
        <S.Text>{route.paths && route.paths?.length > 0 ?
          `${route.paths[0].city_name} - ${route.paths[route.paths.length - 1].city_name}` : null}</S.Text>
        <Timeline position="alternate">
          {route.paths?.map((path: Path) => {
            return (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" variant="outlined">
                    <LocationIcon />
                  </TimelineDot>
                  <TimelineConnector  />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography style={{'fontWeight': 'bold'}} component="p">
                    {`${path.city_name}, ${path.state}`}
                  </Typography>
                  <Typography>{path.isComplete
                      ? <strong style={{color: 'green'}}>CONCLUÍDO</strong>
                      : <strong style={{color: 'blue'}}>A CAMINHO</strong>}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>
        <Button onClick={() => {
          if(route.started) navigateToMap()
          else initRoute()
        }}
         variant="contained" color="success" sx={{ mx: '8px', my: '8px'}} >
          {route.started ? 'Abrir rota no mapa' : 'Iniciar rota'}
        </Button>
        {!route.started && (
          <Button onClick={() => {
            navigateToMap()
          }}
           variant="contained" color="primary" sx={{ mx: '8px', my: '8px'}} >
            Abrir rota no mapa
          </Button>
        )}
        {route.started && route?.paths?.filter(path => !path.isComplete).length > 0 && (
            <Button onClick={() => {
              setShowCheckpointModal(true)
            }}
            variant="contained" sx={{ mx: '8px', my: '8px'}} >
              Atualizar checkpoint
            </Button>
          )
        }
        <Dialog onClose={() => setShowCheckpointModal(false)} open={showCheckpointModal}>
          <DialogTitle>Qual ponto deseja dar como concluído?</DialogTitle>
          <List sx={{ pt: 0 }}>
            {route?.paths?.filter(path => !path.isComplete).map((path) => (
              <ListItemButton onClick={() => updateCheckpoint(path)} key={path.id}>
                <ListItemText primary={path.city_name} />
              </ListItemButton>
            ))}
          </List>
        </Dialog>
      </S.Content>
    </>
  )
}



export default RouteDetail;
