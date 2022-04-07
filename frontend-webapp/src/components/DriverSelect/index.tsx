import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { Container, DriverContainer, ButtonBox } from './style';
import { useRouteInfo, RouteInfo } from '../../hooks/route';

import { api } from '../../service';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export interface Route {
  route: RouteInfo;
}

export interface UserType {
  id: string;
  username: string;
  isDriver: boolean;
  isAdmin: boolean;
  isEnterprise: boolean;
  avatar?: string;
}

interface DriverSelectProps {
  drivers: UserType[];
}

interface CreateRoute {
  driver: UserType;
  initialDate: Date;
  expectedEnd?: Date;
}

export default function DriverSelect({ drivers }: DriverSelectProps) {
  const [driver, setDriver] = useState<UserType | null>();
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const { setRouteInfo } = useRouteInfo();

  const handleDateChange = (date: Date | null) => {
    setInitialDate(date);
  }

  const createRoute = useCallback(async ({ driver, initialDate, expectedEnd }: CreateRoute) => {
    try {
      const response = await api.post('routes', {
        driver_id: driver.id,
        initialDate: initialDate,
        expectedEnd: null
      });
      const route: RouteInfo = response.data;
      setRouteInfo(route);
      console.log(route);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <Container>
      <DriverContainer>
        <Autocomplete
          id="driver select"
          sx={{ width: 300 }}
          options={drivers}
          autoHighlight
          getOptionLabel={(option) => option.username}
          onChange={(_event, value) => {
            setDriver(value);
          }}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`${option.avatar}`}
                srcSet={`${option.avatar} 2x`}
                alt=""
              />
              {option.username}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecione um motorista"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Data"
              value={initialDate}
              onChange={handleDateChange}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </DriverContainer>
      <ButtonBox>
        {driver && (
          <Button variant="contained" size='large' onClick={() => { driver && initialDate && createRoute({driver, initialDate}) }} style={{ marginRight: "4px" }}>
            Confirmar Motorista
          </Button>
        )}
      </ButtonBox>
    </Container>
  );
}

