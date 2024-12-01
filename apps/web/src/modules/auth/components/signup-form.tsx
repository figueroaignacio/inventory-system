import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../hooks/use-register-mutation";
import { SignUpFormData, signUpSchema } from "../lib/schemas";
import { FormField } from "./form-field";
import { SubmitButton } from "./submit-button";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useRegisterMutation();

  const onSubmit = (data: SignUpFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 mx-auto p-6 bg-white shadow-lg rounded-lg border-[1px] border-gray-300"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Crear Cuenta
        </h2>
        <FormField
          id="name"
          label="Nombre"
          type="text"
          registration={register("name")}
          error={errors.name}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email}
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          registration={register("password")}
          error={errors.password}
        />
        <SubmitButton
          isSubmitting={isSubmitting || mutation.isPending}
          label="Crear Cuenta"
        />
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
    </div>
  );
}
