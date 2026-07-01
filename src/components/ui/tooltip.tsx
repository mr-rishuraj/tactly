"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md border border-border bg-card px-3 py-1.5 text-xs text-card-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-input/20 dark:bg-card",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border dark:bg-card dark:border-input/20",
        dark: "bg-foreground text-background border-foreground dark:bg-background dark:text-foreground dark:border-background",
        primary:
          "bg-primary text-primary-foreground border-primary dark:bg-primary dark:text-primary-foreground",
      },
      side: {
        top: "data-[side=top]:slide-in-from-bottom-2",
        right: "data-[side=right]:slide-in-from-left-2",
        bottom: "data-[side=bottom]:slide-in-from-top-2",
        left: "data-[side=left]:slide-in-from-right-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface TooltipContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "side">,
    VariantProps<typeof tooltipContentVariants> {
  side?: "top" | "right" | "bottom" | "left"
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, side, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    side={side as any}
    className={cn(tooltipContentVariants({ variant, className }))}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  delayDuration?: number
  variant?: "default" | "dark" | "primary"
}

const TooltipWrapper = ({
  children,
  content,
  side = "top",
  delayDuration = 200,
  variant = "default",
}: TooltipProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} variant={variant}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipWrapper,
  tooltipContentVariants,
}
