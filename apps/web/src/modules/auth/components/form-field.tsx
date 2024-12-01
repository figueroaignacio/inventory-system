import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export function FormField({
  id,
  label,
  type,
  registration,
  error,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...registration}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
