import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import AppProvider from './hooks';
import { AppRoutes } from './routes/AppRoutes';
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
