import React, { createContext, useCallback, useContext, useState } from 'react';


export interface RouteInfo {
    id: string;
    driver_id: string;
    enterprise_id: string;
    initialDate: Date;
    expectedEnd?: Date;
    isFinished: boolean;

}

interface RouteContextData {
  route: RouteInfo;
  setRouteInfo(route: RouteInfo): void;
}

const RouteContext = createContext<RouteContextData>({} as RouteContextData);

const RouteProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<RouteInfo>({} as RouteInfo);

  const setRouteInfo = useCallback((route: RouteInfo) => {
    setData(route);
  }, []);


  return (
    <RouteContext.Provider
      value={{setRouteInfo, route: data}}
    >
      {children}
    </RouteContext.Provider>
  );
};

function useRouteInfo(): RouteContextData {
  const context = useContext(RouteContext);

  if (!context) {
    throw new Error('useRouteInfo must be used within an AuthProvider');
  }

  return context;
}

export { useRouteInfo, RouteProvider };
