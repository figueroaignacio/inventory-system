import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sistema de Inventario
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Gestiona tu inventario de manera eficiente y sencilla
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Link
              to="/register"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </Link>
            <Link
              to="/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
