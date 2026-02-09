import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
  </Route>
))

export default router