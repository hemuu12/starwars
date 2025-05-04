import { Navigate } from "react-router-dom";
import { JSX } from "react";
import { useAppStore } from "./store/app.store";
import AppShell from "./components/AppShell";
import Login from "./pages/Login";
import ResourceList from "./pages/resources/ResourceList";
import ResourceDetail from "./pages/resources/ResourceDetail";
import LandingPage from "./pages/landing/Landing";
import NotFoundPage from "./pages/ErrorPage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export const routes = [
  {
    path: "/", 
    element: <AppShell />, 
    children: [
      {
        index: true, 
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "resources",
        element: (
          <PrivateRoute>
            <ResourceList />
          </PrivateRoute>
        ),
      },
      {
        path: "resources/:id",
        element: (
          <PrivateRoute>
            <ResourceDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: (
          <NotFoundPage />
        ),
      },
    ],
  },
];
