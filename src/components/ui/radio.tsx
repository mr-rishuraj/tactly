"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const radioGroupVariants = cva("flex gap-4", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
})

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, direction, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn(radioGroupVariants({ direction, className }))}
    {...props}
    ref={ref}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioVariants = cva(
  "aspect-square h-4 w-4 rounded-full border border-primary ring-offset-background transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary/70 dark:focus-visible:ring-primary/40",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
      variant: {
        default:
          "border-input bg-background hover:border-primary dark:bg-input/20 dark:border-input/60",
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

interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  label?: React.ReactNode
  helperText?: string
}

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, size, variant, label, helperText, disabled, ...props }, ref) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioVariants({ size, variant, className }))}
        disabled={disabled}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <label
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
            disabled ? "opacity-50" : "text-foreground"
          )}
        >
          {label}
        </label>
      )}
    </div>
    {helperText && (
      <p className="text-xs text-muted-foreground ml-6">{helperText}</p>
    )}
  </div>
))
Radio.displayName = "Radio"

export { RadioGroup, Radio, radioGroupVariants, radioVariants }
