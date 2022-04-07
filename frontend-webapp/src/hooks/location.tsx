import React, { createContext, useCallback, useContext, useState } from 'react';


export interface LocationInfo {
  countryName: string;
  city: string;
  principalSubdivision: string;
  latitude: number;
  longitude: number;
}

interface LocationContextData {
  location: LocationInfo;
  setLocationInfo(location: LocationInfo): void;
}

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

const LocationProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<LocationInfo>({} as LocationInfo);

  const setLocationInfo = useCallback((location: LocationInfo) => {
    setData(location);
  }, []);


  return (
    <LocationContext.Provider
      value={{setLocationInfo, location: data}}
    >
      {children}
    </LocationContext.Provider>
  );
};

function useLocationInfo(): LocationContextData {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocationInfo must be used within an AuthProvider');
  }

  return context;
}

export { useLocationInfo, LocationProvider };
