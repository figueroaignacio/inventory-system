import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../shared/components/taost-component";
import { SignUpFormData } from "../lib/schemas";
import { registerUser, SignUpResponse } from "../lib/services";

export function useRegisterMutation(): UseMutationResult<
  SignUpResponse,
  Error,
  SignUpFormData
> {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ name, email, password }) =>
      registerUser(name, email, password),
    onSuccess: (data) => {
      showSuccessToast(data.message);
      navigate("/login");
    },
    onError: (error: Error) => {
      console.error("Error registering user:", error);
      showErrorToast("Error registering user. Please try again.");
    },
  });
}
