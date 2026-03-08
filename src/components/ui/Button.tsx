import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonTypes = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
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
  sm: styles["btn-sm"],
  md: styles["btn-md"],
  lg: styles["btn-lg"],
};

const Button = ({
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
      className={`${className} ${typeClasses[btnType]} ${sizeClass[size]} ${styles.btn} p-1`}
      disabled={disabled}
      data-testid={testId}
      aria-label={ariaLabel ?? text}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
