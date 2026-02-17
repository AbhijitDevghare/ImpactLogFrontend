// src/routes/OtherRoutes.jsx
import { Routes, Route } from "react-router-dom";
import CreateEvents from "../pages/CreateEvent";
import UnpublishedEventsPage from "../pages/UnpublishedEventsPage";
import MainLayout from "../layout/MainLayout";
import RoleProtectedRoute from '../components/RoleProtectedRoute';

function OtherRoutes() {
  // Define allowed roles for community/org routes
  const allowedRoles = ['community', 'organization']; // Adjust based on actual role values

  return (
    <Routes>
      <Route path="/create-events" element={
        <RoleProtectedRoute allowedRoles={allowedRoles}><CreateEvents /></RoleProtectedRoute>
      } />
      <Route path="/publish-events" element={
        <RoleProtectedRoute allowedRoles={allowedRoles}><MainLayout><UnpublishedEventsPage /></MainLayout></RoleProtectedRoute>
      } />
    </Routes>
  );
}

export default OtherRoutes;
