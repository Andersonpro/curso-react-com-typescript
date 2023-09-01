import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { DashBoard } from "../pages/dashboard/DashBoard";
import {Login} from "../pages/login/Login";

export function Rotas(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}