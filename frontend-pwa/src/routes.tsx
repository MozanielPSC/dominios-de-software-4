import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from './hooks/auth';

export default function Routes() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}


