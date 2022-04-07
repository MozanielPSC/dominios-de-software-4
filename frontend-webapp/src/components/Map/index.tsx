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
  latitude: number;
  longitude: number;
}

function Map() {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([0, 0]);
  const { location, setLocationInfo } = useLocationInfo();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function loadPosition(position: { coords: { latitude: number, longitude: number } }) {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    }

    function handleError(err: { code: number, message: string }) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    navigator.geolocation.getCurrentPosition(loadPosition, handleError, options);
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
            center={initialPosition || markerPosition}
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
