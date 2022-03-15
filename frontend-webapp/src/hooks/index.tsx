import React from 'react';
import { LocationProvider } from './location';

const AppProvider: React.FC = ({ children }) => {
  return (
    <LocationProvider>
      {children}
    </LocationProvider>
  );
};

export default AppProvider;