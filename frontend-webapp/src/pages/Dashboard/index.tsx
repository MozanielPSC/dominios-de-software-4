import { Button, Grid, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import Map from '../../components/Map';
import { Sidebar } from "../../components/SideBar";
import { ContainerTest, FormContainer, MapBox } from "./style";

type Inputs = {
  example: string,
  exampleRequired: string,
};

export function Dashboard() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


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
              label="Example Required"
              variant="filled"
              {...register("exampleRequired")}
              required
              error={errors.exampleRequired ? true : false}
            />
          </Grid>
          <Grid item xs={6} >
            <TextField
              label="Example"
              {...register("exampleRequired")}
              variant="filled"
              error={errors.example ? true : false}
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