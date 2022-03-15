import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material';
import Routes from './routes'

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>

  );
}

export default App;
