import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../shared/components/taost-component.tsx";
import { useAuth } from "../hooks/use-auth.ts";

interface LoginResponse {
  message: string;
  userName: string;
}

async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export function SignInForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, setUserName } = useAuth();

  const mutation: UseMutationResult<
    LoginResponse,
    Error,
    { email: string; password: string }
  > = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      setUserName(data.userName);
      login();
      navigate("/dashboard");
    },
    onError: () => {
      setError("Invalid credentials. Please try again.");
      showErrorToast("Error registering user. Please try again.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    mutation.mutate({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-96 mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
      {error && (
        <p
          className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded"
          role="alert"
        >
          {error}
        </p>
      )}
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
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>
      <p className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline focus:outline-none"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
