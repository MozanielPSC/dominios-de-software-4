
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import MyRoutes from "../pages/MyRoutes";
import RouteDetail from "../pages/RouteDetail";
import { SignIn } from "../pages/SignIn";
import { ProtectedRoute } from "./ProtectedRoutes";
import { RedirectRoute } from "./RedirectRoute";

export function AppRoutes() {
  const { user } = useAuth()

  return (
      <>
        <Routes>
          <Route
            index
            element={
              <RedirectRoute user={user}>
                <SignIn />
              </RedirectRoute>
            }
          />
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
          <Route path="*" element={
              <RedirectRoute user={user}>
                <SignIn />
              </RedirectRoute>
            }
          />
        </Routes>
      </>
  )
}
