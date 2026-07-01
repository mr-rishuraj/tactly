"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded border border-primary ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:border-primary/70 dark:data-[state=checked]:bg-primary dark:focus-visible:ring-primary/40",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
      variant: {
        default:
          "border-input bg-background hover:bg-muted data-[state=checked]:bg-primary dark:bg-input/20",
        outline:
          "border-2 border-border bg-transparent hover:border-primary dark:border-input/40",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode
  helperText?: string
  error?: string
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    { className, size, variant, label, helperText, error, disabled, ...props },
    ref
  ) => (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(checkboxVariants({ size, variant, className }))}
          disabled={disabled}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current")}
          >
            <Check className="h-3 w-3" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
              error ? "text-destructive" : "text-foreground"
            )}
          >
            {label}
          </label>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={cn(
            "text-xs mt-1 ml-6 transition-colors",
            error
              ? "text-destructive dark:text-destructive/70"
              : "text-muted-foreground"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants }
