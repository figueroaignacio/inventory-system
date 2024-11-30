import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../shared/components/taost-component";

interface SignUpResponse {
  message: string;
}

async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<SignUpResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
}

export function SignUpForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const mutation: UseMutationResult<
    SignUpResponse,
    Error,
    { name: string; email: string; password: string }
  > = useMutation({
    mutationFn: ({ name, email, password }) =>
      registerUser(name, email, password),
    onSuccess: (data) => {
      showSuccessToast(data.message); // Muestra un toast de éxito
      navigate("/login"); // Redirige al login
    },
    onError: (error: Error) => {
      console.error("Error registering user:", error);
      showErrorToast("Error registering user. Please try again."); // Muestra un toast de error
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-96 mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow ${
          mutation.isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-500"
        }`}
      >
        {mutation.isPending ? "Registering..." : "Register"}
      </button>
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline focus:outline-none"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
