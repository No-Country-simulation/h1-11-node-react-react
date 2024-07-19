import { Routes, Route } from "react-router-dom";


import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};