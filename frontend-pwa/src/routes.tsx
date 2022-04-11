import { AuthProvider } from "./hooks/auth";
import { AppRoutes } from "./routes/AppRoutes";

export default function Routes() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}


