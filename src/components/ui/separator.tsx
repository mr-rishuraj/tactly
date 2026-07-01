import { cva, type VariantProps } from "class-variance-authority"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

import { cn } from "@/lib/utils"

const separatorVariants = cva("shrink-0 bg-border dark:bg-input/20", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    variant: {
      default: "bg-border dark:bg-input/20",
      muted: "bg-muted dark:bg-muted/40",
      subtle: "bg-border/50 dark:bg-input/10",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
})

interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, "orientation">,
    VariantProps<typeof separatorVariants> {
  orientation?: "horizontal" | "vertical"
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", variant, decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ orientation, variant, className })
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

const Divider = Separator

interface DividerWithLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Separator>, "children"> {
  label?: React.ReactNode
  orientation?: "horizontal" | "vertical"
}

const DividerWithLabel = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  DividerWithLabelProps
>(({ className, label, orientation = "horizontal", variant, ...props }, ref) => {
  if (orientation === "vertical") {
    return (
      <Separator
        ref={ref}
        orientation={orientation}
        variant={variant}
        className={className}
        {...props}
      />
    )
  }

  return (
    <div className="relative flex items-center gap-2">
      <Separator
        ref={ref}
        orientation={orientation}
        variant={variant}
        className="flex-1"
        {...props}
      />
      {label && (
        <span className="px-2 text-xs font-medium text-muted-foreground whitespace-nowrap bg-background dark:bg-card">
          {label}
        </span>
      )}
      <Separator
        orientation={orientation}
        variant={variant}
        className="flex-1"
        aria-hidden="true"
      />
    </div>
  )
})
DividerWithLabel.displayName = "DividerWithLabel"

export {
  Separator,
  Divider,
  DividerWithLabel,
  separatorVariants,
}
