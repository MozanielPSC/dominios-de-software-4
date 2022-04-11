import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material';
import Routes from './routes'

import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>

  );
}

export default App;
