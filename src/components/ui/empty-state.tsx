import { cva, type VariantProps } from "class-variance-authority"
import { Inbox } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-12 px-4 text-center transition-colors dark:border-input/20 dark:bg-input/5",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/30 dark:border-input/20",
        muted: "border-muted bg-muted/10 dark:border-muted/40 dark:bg-muted/5",
        accent:
          "border-accent bg-accent/10 dark:border-accent/40 dark:bg-accent/5",
      },
      size: {
        sm: "py-6 px-3",
        default: "py-12 px-4",
        lg: "py-16 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      title = "No data found",
      description,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIcon = icon || <Inbox className="h-8 w-8 opacity-40" />

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size, className }))}
        {...props}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="text-muted-foreground">{defaultIcon}</div>
          {title && (
            <h3 className="font-semibold text-foreground text-sm md:text-base">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs">
              {description}
            </p>
          )}
          {children && (
            <div className="text-xs md:text-sm text-muted-foreground max-w-xs">
              {children}
            </div>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants }
