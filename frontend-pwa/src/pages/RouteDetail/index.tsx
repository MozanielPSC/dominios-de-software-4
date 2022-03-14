import React from 'react';

import AppBar from '../../components/AppBar';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


import { Typography, Button } from '@mui/material'

import LocationIcon from '@mui/icons-material/LocationOn';

import * as S from './styles'

const mockUrl = 'https://www.google.com/maps/dir/?api=1&origin=-16.731706,-49.261479&destination=-15.798720,-47.863916&travelmode=driving&waypoints=-16.329111,-48.955995'

const RouteDetail: React.FC = () => {


  const redirectToMaps = () => {
    window.location.href = mockUrl
  }

  return (
    <>
      <AppBar title="Detalhes do trajeto" />
      <S.Content>
        <S.Title>NOME DO TRAJETO</S.Title>
        <S.Text>Entrega de Soja</S.Text>
        <S.Title>DESCRIÇÃO</S.Title>
        <S.Text>Entrega de Soja pelo Brasil</S.Text>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <LocationIcon />
              </TimelineDot>
              <TimelineConnector  />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Goiânia, GO
              </Typography>
              <Typography>LUGO Festas & Eventos - pula pula | Aluguel cadeiras | Pipoca | algodão doce</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <LocationIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Anápolis, GO
                </Typography>
                <Typography>R. Quinze de Dezembro, 385 - St. Central</Typography>
              </TimelineContent>
          </TimelineItem>
          <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <LocationIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Brasília, DF
                </Typography>
                <Typography>Eixo Monumental, Praça dos Três Poderes</Typography>
              </TimelineContent>
          </TimelineItem>
        </Timeline>
        <Button onClick={() => {
          redirectToMaps()
        }} variant="contained" color="success" sx={{ mx: '8px', my: '8px'}} >
          Iniciar Rota
        </Button>
      </S.Content>
    </>
  )
}



export default RouteDetail;
