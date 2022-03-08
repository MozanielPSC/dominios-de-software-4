import LeafLet from 'leaflet'
import { Sidebar } from "../../components/SideBar";
import { ContainerTest, FormBox, MapBox } from "./style";
import Map from '../../components/Map'

export function Dashboard() {

  return (
    <ContainerTest maxWidth="lg">
      <FormBox>
        <Sidebar />
        <h1>Dashboard</h1>


      </FormBox>
      <MapBox>
        <Map />
      </MapBox>
    </ContainerTest>
  )
}