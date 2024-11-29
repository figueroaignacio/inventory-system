import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);

  const mutation: UseMutationResult<
    SignUpResponse,
    Error,
    { name: string; email: string; password: string }
  > = useMutation({
    mutationFn: ({ name, email, password }) =>
      registerUser(name, email, password),
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error: Error) => {
      console.error("Error registering user:", error);
      setError("Error registering user. Please try again.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    mutation.mutate({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
