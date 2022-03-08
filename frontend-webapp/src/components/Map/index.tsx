import LeafLet from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const markerIcon = LeafLet.icon({
  iconUrl:
    'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
  iconRetinaUrl:
    'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [40, 40]
})

function Map() {
  return (
    <MapContainer
      center={[-16.6111727, -49.2740144]} 
      zoom={15}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        icon={markerIcon}
        position={[-16.6111727, -49.2740144]}
      />
    </MapContainer>
  )
}

export default Map
