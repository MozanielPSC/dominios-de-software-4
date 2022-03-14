import { BrowserRouter, Route, Routes } from "react-router-dom";

import MyRoutes from "./pages/MyRoutes";
import RouteDetail from "./pages/RouteDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/routes" element={<MyRoutes />} />
          <Route path="/routes/:id" element={<RouteDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
