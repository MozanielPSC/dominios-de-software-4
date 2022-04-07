import AddLocationIcon from '@mui/icons-material/AddLocation';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Map from '../../components/Map';
import { Sidebar } from "../../components/SideBar";
import { LocationInfo, useLocationInfo } from '../../hooks/location';
import { ContainerTest, FormContainer, MapBox } from "./style";

type Inputs = {
  city: string;
  state: string;
};

type RouteData = {
  route_id :"string",
  initLat:number,
  finalLat?:number,
  initLong:number,
  finalLong?:number,
  isInitial:number,
  isFinal:number
}


export function Dashboard() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.city = location.city;
    data.state = location.principalSubdivision;
    console.log(locationArray);
    reset({
      city: '',
      state: ''
    });
  };

  const { location } = useLocationInfo();
  const [locationArray, setLocationArray] = useState<LocationInfo[]>([]);

  const handleAddPath = (location: LocationInfo) => {
    setLocationArray([...locationArray, location]);
  }

  const handleDeletePath = (location: LocationInfo) => {
    setLocationArray(locationArray.filter(item => item !== location));
  }

  // const generateRoutes = (locationArray: LocationInfo[]) {
  //   let routeArray: RouteData[] = [];
  //   locationArray.forEach((location, index) => {
  //     if (index === 0) {
  //       routeArray.push({
  //         route_id: "",
  //         initLat: location.latitude,
  //         finalLat: locationArray[index + 1].latitude,
  //         initLong: location.longitude,
  //         finalLong: locationArray[index + 1].longitude,
  //         isInitial: 1,
  //         isFinal: 0
  //       });
  //     } else if (index === locationArray.length - 1) {
  //       routeArray.push({
  //         route_id: "",
  //         initLat: location.latitude,
  //         initLong: location.longitude,
  //         isInitial: 0,
  //         isFinal: 1
  //       });
  //     } else {
  //       routeArray.push({
  //         route_id: "",
  //         initLat: location.latitude,
  //         finalLat: locationArray[index + 1].latitude,
  //         initLong: location.longitude,
  //         finalLong: locationArray[index + 1].longitude,
  //         isInitial: 0,
  //         isFinal: 0
  //       });
  //     }
  //   })
  // }

  function handleGenerateNewRouteFields() {
    handleAddPath(location);
    reset({
      city: '',
      state: ''
    });
  }

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
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={2} >
            <Button variant="contained" size='large' onClick={handleGenerateNewRouteFields} style={{ marginRight: "4px" }}>
              <AddLocationIcon />
            </Button>
          </Grid>
          <Grid item xs={4} >
            <TextField
              label="Cidade"
              variant="filled"
              {...register("city")}
              error={errors.city ? true : false}
              value={location.city}
            />
          </Grid>
          <Grid item xs={4} >
            <TextField
              label="Estado"
              {...register("state")}
              variant="filled"
              error={errors.state ? true : false}
              value={location.principalSubdivision}
            />
          </Grid>
          {locationArray.length >= 1 ?
          <Grid
            container
            spacing={2}
            paddingX={4}
            style={{ marginTop: "20px" }}
          >
            <h2>Sua Rota Atual</h2>
          </Grid>
          : null}
        {locationArray.map((location, index) => (
          <Grid
            container
            padding={2}
            width="100%"
            key={index}
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={2} >
              <Button
                variant="contained"
                size='large'
                onClick={() => {
                  handleDeletePath(location);
                }}
                style={{ marginRight: "4px", backgroundColor: "#DC143C" }}>
                <DeleteIcon />
              </Button>

            </Grid>
            <Grid item xs={4} >
              <TextField label={`${location.city}`} variant="filled" disabled />
            </Grid>
            <Grid item xs={4} >
              <TextField label={`${location.principalSubdivision}`} variant="filled" disabled />
            </Grid>

          </Grid>
        ))
        }
          <Grid item xs={12} display="flex" justifyContent="center" style={{ marginTop: "20px", height: "60px"}}>
            <Button variant="contained" type="submit" size="large">Finalizar Rota</Button>
          </Grid>
        </Grid>
      </FormContainer>
      <MapBox>
        <Map />
      </MapBox>
    </ContainerTest>
  )
}