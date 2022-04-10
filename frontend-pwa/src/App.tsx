import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material';
import Routes from './routes'

import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
      <ToastContainer />
    </ThemeProvider>

  );
}

export default App;
