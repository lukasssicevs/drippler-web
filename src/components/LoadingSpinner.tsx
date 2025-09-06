interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({
  message,
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="text-center">
      <div
        className={`animate-spin ${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full mx-auto mb-4`}
      ></div>
      {message && <p className="text-purple-100">{message}</p>}
    </div>
  );
}
