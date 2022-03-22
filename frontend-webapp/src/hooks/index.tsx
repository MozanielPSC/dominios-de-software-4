import React from 'react';
import { AuthProvider } from './auth';
import { LocationProvider } from './location';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <LocationProvider>
        {children}
      </LocationProvider>
    </AuthProvider>

  );
};

export default AppProvider;