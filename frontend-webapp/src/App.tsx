import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { AppRoutes } from './AppRoutes';
import AppProvider from './hooks';
const theme = createTheme();


function App() {

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>

  )
}

export default App
