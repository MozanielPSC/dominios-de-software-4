import { Button, Grid, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import Map from '../../components/Map';
import { Sidebar } from "../../components/SideBar";
import { useLocationInfo } from '../../hooks/location';
import { ContainerTest, FormContainer, MapBox } from "./style";

type Inputs = {
  city: string,
  state: string,
};


export function Dashboard() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const { location } = useLocationInfo()


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
          padding={4}
          width="100%"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
        >
          <Grid item xs={6} >
            <TextField
              label="Cidade"
              variant="filled"
              {...register("city")}
              error={errors.city ? true : false}
              value={location.city}
            />
          </Grid>
          <Grid item xs={6} >
            <TextField
              label="Estado"
              {...register("state")}
              variant="filled"
              error={errors.state ? true : false}
              value={location.principalSubdivision}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="right">
            <Button variant="contained" type="submit">Cadastrar</Button>
          </Grid>
        </Grid>
      </FormContainer>
      <MapBox>
        <Map />
      </MapBox>
    </ContainerTest>
  )
}