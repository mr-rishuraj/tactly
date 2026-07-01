import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-8 w-full rounded-lg border border-input bg-input/30 px-2.5 py-1.5 text-sm transition-all outline-none placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-input dark:bg-input/20 dark:focus-visible:border-primary/40 dark:focus-visible:ring-primary/40 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "border-input bg-input/30 dark:border-input dark:bg-input/20",
        outline:
          "border-border bg-background hover:border-border dark:bg-input/10",
        ghost: "border-transparent bg-input/20 dark:bg-input/10",
      },
      size: {
        default: "h-8 px-2.5 py-1.5 text-sm",
        sm: "h-7 px-2 py-1 text-xs",
        lg: "h-9 px-3 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string
  labelVariant?: "default" | "muted" | "accent" | "destructive"
  error?: string
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: "start" | "end"
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  loading?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      icon,
      iconPosition = "start",
      startAdornment,
      endAdornment,
      loading,
      disabled,
      type = "text",
      ...props
    },
    ref
  ) => {
    const hasError = !!error
    const showHelper = error || helperText

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium leading-none text-foreground">
            {label}
            {props.required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {startAdornment && (
            <div className="absolute left-2.5 flex items-center pointer-events-none">
              {startAdornment}
            </div>
          )}

          {icon && iconPosition === "start" && (
            <div className="absolute left-2.5 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, className }),
              startAdornment && "pl-9",
              icon && iconPosition === "start" && "pl-9",
              endAdornment && "pr-9",
              icon && iconPosition === "end" && "pr-9",
              loading && "opacity-50"
            )}
            disabled={disabled || loading}
            aria-invalid={hasError}
            ref={ref}
            {...props}
          />

          {icon && iconPosition === "end" && (
            <div className="absolute right-2.5 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}

          {endAdornment && (
            <div className="absolute right-2.5 flex items-center pointer-events-none">
              {endAdornment}
            </div>
          )}

          {loading && (
            <div className="absolute right-2.5 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary/30 border-t-primary" />
            </div>
          )}
        </div>

        {showHelper && (
          <p
            className={cn(
              "text-xs mt-1 transition-colors",
              hasError
                ? "text-destructive dark:text-destructive/70"
                : "text-muted-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
