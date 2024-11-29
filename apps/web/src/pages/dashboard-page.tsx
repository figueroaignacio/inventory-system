import { useNavigate } from "react-router-dom";
import { UsersList } from "../modules/auth/components/users-list.tsx";
import { useAuth } from "../modules/auth/hooks/use-auth.ts";

export function DashboardPage() {
  const { logout, userName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Hola, {userName ? userName : "usuario"}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <UsersList />
    </div>
  );
}
