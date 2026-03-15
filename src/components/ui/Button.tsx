import { ReactNode } from "react";
import "./Button.css";

type ButtonTypes = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  onClick: () => void;
  testId: string;
  btnType?: ButtonTypes;
  size?: ButtonSize;
  text?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

const typeClasses: Record<ButtonTypes, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover font-semibold",
  secondary: "bg-accent text-text-dark hover:bg-accent-hover font-semibold",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const Button = ({
  onClick,
  testId,
  btnType = "primary",
  size = "sm",
  text,
  icon,
  disabled,
  className,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${typeClasses[btnType]} ${sizeClass[size]} btn p-1`}
      disabled={disabled}
      data-testid={testId}
      aria-label={ariaLabel ?? text}
    >
      {icon && <span className="icon">{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
