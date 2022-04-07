import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { ContainerTest, FormContainer, MapBox } from "./style";

import { useRouteInfo } from '../../hooks/route';
import Map from '../../components/Map';
import { Sidebar } from "../../components/SideBar";
import RouteSetUp from '../../components/RouteSetUp/Index';
import DriverSelect, { UserType } from '../../components/DriverSelect';
import { api } from '../../service';

export function Dashboard() {

  const { route } = useRouteInfo();

  const [drivers, setDrivers] = useState<UserType[]>([]);

  const getUsers = async () => {
    const response = await api.get('/users/getAll');
    const users: UserType[] = response.data;
    const drivers = users.filter(user => user.isDriver);
    setDrivers(drivers);
  }

  useEffect(() => {
    getUsers();
  }, [])


  return (
    <ContainerTest maxWidth="xl">
      <FormContainer>
        <Sidebar />
        <Grid
          container
          padding={4}
          spacing={2}
        >
          <h1>Cadastre uma viagem</h1>
        </Grid>
        <Grid
          container
          padding={2}
          width="100%"
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            {drivers ?
              <DriverSelect drivers={drivers} /> :
              <CircularProgress />
            }
          </Grid>
        </Grid>
        { route.id ? <RouteSetUp /> : null }
      </FormContainer>
      <MapBox>
        <Map />
      </MapBox>
    </ContainerTest>
  )
}

