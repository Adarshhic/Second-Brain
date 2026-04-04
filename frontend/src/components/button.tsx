import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg"; 
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-400",
};

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

function Button({ variant, text, startIcon, onClick, fullWidth, loading, size = "md" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        variantClasses[variant],
        sizeStyles[size],         
        "flex items-center rounded-md",
        fullWidth ? "w-full justify-center" : "",
        loading ? "opacity-45 cursor-not-allowed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={loading}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  );
}

export default Button;