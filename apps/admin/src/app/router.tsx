import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
