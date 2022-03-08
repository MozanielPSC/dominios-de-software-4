import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material';
import { AppRoutes } from './AppRoutes';
import 'leaflet/dist/leaflet.css'
const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
     
  )
}

export default App
