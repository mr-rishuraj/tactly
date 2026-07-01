import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin rounded-full border-2 border-current", {
  variants: {
    size: {
      xs: "h-3 w-3 border-2",
      sm: "h-4 w-4 border-2",
      default: "h-5 w-5 border-2",
      md: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-2",
      xl: "h-10 w-10 border-3",
    },
    color: {
      default: "border-current border-t-primary dark:border-t-primary",
      primary: "border-primary/30 border-t-primary dark:border-t-primary",
      secondary: "border-secondary/30 border-t-secondary dark:border-t-secondary",
      destructive: "border-destructive/30 border-t-destructive dark:border-t-destructive",
      success: "border-green-500/30 border-t-green-600 dark:border-t-green-400",
      muted: "border-muted border-t-foreground dark:border-t-muted-foreground",
    },
  },
  defaultVariants: {
    size: "default",
    color: "primary",
  },
})

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(spinnerVariants({ size, color, className }))}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
)
Spinner.displayName = "Spinner"

const LoadingOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    show?: boolean
    label?: string
  }
>(({ className, show = false, label = "Loading...", ...props }, ref) => {
  if (!show) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        {label && <p className="text-xs text-muted-foreground">{label}</p>}
      </div>
    </div>
  )
})
LoadingOverlay.displayName = "LoadingOverlay"

export { Spinner, LoadingOverlay, spinnerVariants }
