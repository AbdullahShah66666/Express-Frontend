import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import NoPage from "../pages/NoPage";
import Settings from "../pages/Settings";
import ProfileOverview from "../pages/ProfileOverview";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<ProfileLayout />}>
        <Route index element={<ProfileOverview />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Route>
  )
);

export default router;