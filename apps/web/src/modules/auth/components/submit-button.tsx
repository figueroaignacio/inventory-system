interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
}

export function SubmitButton({ isSubmitting, label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow ${
        isSubmitting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-500"
      }`}
    >
      {isSubmitting ? "Processing..." : label}
    </button>
  );
}
