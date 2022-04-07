import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";
import { ProtectedRoute } from "./ProtectedRoutes";

export function AppRoutes() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}