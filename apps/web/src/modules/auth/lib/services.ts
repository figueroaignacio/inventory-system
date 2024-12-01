export interface SignUpResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
  userName: string;
}

export async function registerUser(
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

export async function loginUser(
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
