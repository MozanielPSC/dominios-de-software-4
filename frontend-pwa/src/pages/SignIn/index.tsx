import { Copyright, LockClockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export function SignIn(){
  const navigate = useNavigate();

  const {signIn} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(async () => {
    await signIn({
      email: email,
      password: password
    })
    navigate('/my-routes')
  }, [signIn, email, password, navigate])

  return(
    <Grid container component="main" sx={{ height: '100vh' }}>
    <CssBaseline />
    <Grid item xs={12} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockClockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="div" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Grid>
  </Grid>
  )
}
