import { Routes, Route } from "react-router-dom";


import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/Home/HomePage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AppointmentsPage from "../pages/Appointments/AppointmentPage";
import RecipesPage from "../pages/Recipes/RecipesPage";
import HistoryPage from "../pages/History/HistoryPage";
import DietPage from "../pages/Diet/DietPage";
import InformationPage from "../pages/Information/InformationPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/diet" element={<DietPage />} />
      <Route path="/information" element={<InformationPage />} />

    </Routes>
  );
};