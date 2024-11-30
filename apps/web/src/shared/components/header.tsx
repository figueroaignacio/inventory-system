import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6">
      <Link
        to="/"
        className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition"
      >
        Inventory System
      </Link>
      <div className="space-x-4">
        <Link
          to="/register"
          className="px-4 py-2 text-white font-semibold bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 font-semibold text-blue-600 border border-blue-600 rounded-md shadow hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Log in
        </Link>
      </div>
    </header>
  );
}
