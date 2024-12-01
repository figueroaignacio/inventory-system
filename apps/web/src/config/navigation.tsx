import { ProtectedRoute } from "../modules/auth/components/protected-route.tsx";
import { DashboardPage, LandingPage, SignInPage, SignUpPage } from "../pages";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
];
