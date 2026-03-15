import { forwardRef, InputHTMLAttributes } from "react";
import "./CustomInput.css";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isRequired?: boolean;
  error?: string;
  helperText?: string;
}

const CustomInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      isRequired = false,
      error,
      helperText,
      className = "",
      id,
      name,
      ...restProps
    },
    ref,
  ) => {
    const inputId = id || name;
    const testId = name ? `${name}-input` : "custom-input";

    return (
      <div className="flex flex-col gap-1.5" data-testid={testId}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[0.8rem] font-semibold text-text-dark flex gap-1.5 items-center"
            data-testid="custom-input-label"
          >
            {label}
            {!isRequired && (
              <span className="font-normal text-text-light text-[0.73rem]">
                (optional)
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          required={isRequired}
          className={`form-input w-full px-3.5 py-2.5 text-sm ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...restProps}
        />

        {error && (
          <p className="text-xs text-red-600" data-testid="custom-input-error">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            className="text-xs text-text-light"
            data-testid="custom-input-helper"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

CustomInput.displayName = "custom-inpuy";

export default CustomInput;
