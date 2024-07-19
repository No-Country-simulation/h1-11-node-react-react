import { Route, Routes, useLocation } from "react-router-dom";

import { AuthRoutes } from "./AuthRoutes";


export const AppRouter = () => {
  const { pathname } = useLocation();
  const lastPath = pathname;

  // Guarda la última ruta visitada en el localStorage
  localStorage.setItem("lastPath", lastPath);

  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
    </Routes>
  );
};
