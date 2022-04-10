import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import MyRoutes from "../pages/MyRoutes";
import RouteDetail from "../pages/RouteDetail";
import { SignIn } from "../pages/SignIn";
import { ProtectedRoute } from "./ProtectedRoutes";

export function AppRoutes() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />} />
        <Route
          path="/my-routes"
          element={
            <ProtectedRoute user={user}>
              <MyRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/routes/:id"
          element={
            <ProtectedRoute user={user}>
              <RouteDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
