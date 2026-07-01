import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm flex items-start gap-3 transition-all [&>svg]:shrink-0 [&>svg]:mt-0.5",
  {
    variants: {
      variant: {
        default: "bg-background border-border text-foreground",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/50 dark:bg-destructive/20 dark:text-destructive/70 [&>svg]:text-destructive",
        success:
          "border-green-500/30 bg-green-500/10 text-green-700 dark:border-green-500/50 dark:bg-green-500/20 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-500/50 dark:bg-amber-500/20 dark:text-amber-400 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        info: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/20 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  onClose?: () => void
  closable?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      title,
      description,
      icon,
      onClose,
      closable,
      children,
      ...props
    },
    ref
  ) => {
    // Auto-select icon based on variant
    let defaultIcon = icon
    if (!defaultIcon) {
      switch (variant) {
        case "destructive":
          defaultIcon = <XCircle className="h-5 w-5" />
          break
        case "success":
          defaultIcon = <CheckCircle2 className="h-5 w-5" />
          break
        case "warning":
          defaultIcon = <AlertCircle className="h-5 w-5" />
          break
        case "info":
          defaultIcon = <Info className="h-5 w-5" />
          break
        default:
          defaultIcon = null
      }
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        {defaultIcon}
        <div className="flex-1">
          {title && <h5 className="font-semibold mb-1">{title}</h5>}
          <div className="text-sm opacity-90">
            {description || children}
          </div>
        </div>
        {closable && (
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }
