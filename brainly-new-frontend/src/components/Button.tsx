import React, { ReactElement } from "react";

type ButtonVariants = "primary" | "secondary" | "danger" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: () => void;
  startIcons?: ReactElement;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  startIcons,
}) => {
  const baseStyles =
    "relative px-2 py-1.5 rounded-lg font-semi-bold overflow-hidden transition-all duration-300  w-max-full";

  const variants: Record<ButtonVariants, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-500 text-white hover:bg-gray-800",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} relative group`}
      disabled={disabled}
    >
      {/* Glow Effect on Hover */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 scale-x-[2.0] blur-md 
        before:absolute before:inset-0 before:top-1/2 before:aspect-square 
        before:animate-[spin_3s_linear_infinite] before:bg-gradient-conic 
        before:from-blue-500 before:via-green-400 before:to-purple-500 opacity-50"
      />

      {/* Hover Glow Effect */}
      <span
  className="absolute inset-0 rounded-lg border-2 border-transparent 
  transition-all duration-300 group-hover:border-white 
  group-hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.8),0_0_30px_rgba(255,255,255,0.3)] 
  group-hover:bg-opacity-10"
/>

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {startIcons && <span>{startIcons}</span>}
        {children}
      </span>
    </button>
  );
};

export default Button;
