import React from 'react';
import { AuthProvider } from './auth';
import { RouteProvider } from './route';
import { LocationProvider } from './location';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <LocationProvider>
        <RouteProvider>
          {children}
        </RouteProvider>
      </LocationProvider>
    </AuthProvider>

  );
};

export default AppProvider;