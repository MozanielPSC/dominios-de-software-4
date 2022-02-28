import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { SignIn } from "./SignIn";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}