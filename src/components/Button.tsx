import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, type = "button" }) => {
  return (
    <button onClick={onClick} className={`p-2 rounded ${className}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
