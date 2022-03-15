import { CircularProgress } from '@mui/material';
import LeafLet from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useLocationInfo } from '../../hooks/location';
import { geo_loc_api } from '../../service';

const markerIcon = LeafLet.icon({
  iconUrl:
    'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
  iconRetinaUrl:
    'https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [40, 40]
})


interface LocationInfo {
  countryName: string;
  city: string;
  principalSubdivision: string;
}


function Map() {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([-16.6111694, -49.2713811]);
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([0, 0]);
  const { setLocationInfo } = useLocationInfo();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);

    });
  }, []);

  const LocationMarker = () => {

    const map = useMapEvents({
      click(e) {
        setMarkerPosition([
          e.latlng.lat,
          e.latlng.lng
        ]);
        const response = fetch(`${geo_loc_api}${e.latlng.lat}&longitude=${e.latlng.lng}&localityLanguage=pt`, { method: 'GET' })
          .then(res => res.json())
        response.then(r => setLocationInfo(r as LocationInfo))
      }
    })

    return (
      markerPosition ?
        <Marker
          icon={markerIcon}
          key={markerPosition[0]}
          position={markerPosition}
          interactive={false}
        />
        : null
    )
  }

  return (
    <>
      {
        initialPosition[0] !== 0 ? (
          <MapContainer
            center={markerPosition || initialPosition}
            zoom={12}
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LocationMarker />
          </MapContainer>
        ) : <CircularProgress />
      }
    </>
  )
}

export default Map
