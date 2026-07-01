import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:text-destructive/70 dark:hover:bg-destructive/30",
        outline:
          "border border-primary text-primary hover:bg-primary/10 dark:border-primary/50",
        success:
          "bg-green-500/20 text-green-600 dark:bg-green-500/15 dark:text-green-400",
        warning:
          "bg-amber-500/20 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        info: "bg-blue-500/20 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        muted:
          "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  onRemove?: () => void
  closable?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      onRemove,
      closable,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        {icon && <span className="flex items-center">{icon}</span>}
        <span>{children}</span>
        {closable && (
          <button
            onClick={onRemove}
            className="ml-1 flex items-center opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Remove"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
