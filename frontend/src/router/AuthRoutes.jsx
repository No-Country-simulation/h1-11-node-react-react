import { Routes, Route } from "react-router-dom";


import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/Home/HomePage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};