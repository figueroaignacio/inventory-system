import { HomePage, SignInPage, SignUpPage, DashboardPage } from "../pages";
import { ProtectedRoute } from "../modules/auth/components/protected-route.tsx";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
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
