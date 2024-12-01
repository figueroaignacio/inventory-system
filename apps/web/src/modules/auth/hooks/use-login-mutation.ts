import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../shared/components/taost-component";
import { useAuth } from "../hooks/use-auth";
import { LoginResponse, loginUser } from "../lib/services";

export function useLoginMutation(): UseMutationResult<
  LoginResponse,
  Error,
  { email: string; password: string }
> {
  const navigate = useNavigate();
  const { login, setUserName } = useAuth();

  return useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      setUserName(data.userName);
      login();
      navigate("/dashboard");
    },
    onError: () => {
      showErrorToast("Invalid credentials. Please try again.");
    },
  });
}
