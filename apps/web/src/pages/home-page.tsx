import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      <h1>Hola, ve y registrate</h1>
      <div className="flex gap-9">
        <Link to="/register">Registrarse</Link>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
}
