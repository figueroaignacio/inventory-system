import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../hooks/use-login-mutation";
import { FormField } from "./form-field";
import { SubmitButton } from "./submit-button";

interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();
  const mutation = useLoginMutation();

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96 mx-auto p-6 bg-white shadow-lg rounded-lg border-[1px] border-gray-300"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
      <FormField
        id="email"
        label="Email"
        type="email"
        registration={register("email", { required: "Email is required" })}
        error={errors.email}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        registration={register("password", {
          required: "Password is required",
        })}
        error={errors.password}
      />
      <SubmitButton
        isSubmitting={isSubmitting || mutation.isPending}
        label={mutation.isPending ? "Logging in..." : "Login"}
      />
      <p className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline focus:outline-none"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
