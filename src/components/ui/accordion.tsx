"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const accordionItemVariants = cva(
  "border-b border-border dark:border-input/20",
  {
    variants: {
      variant: {
        default: "border-b border-border dark:border-input/20",
        card: "mb-2 border border-border rounded-lg dark:border-input/20 [&:last-child]:mb-0",
        outline:
          "border border-border rounded-lg mb-2 dark:border-input/20 [&:last-child]:mb-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant, className }))}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const accordionTriggerVariants = cva(
  "flex flex-1 items-center justify-between py-4 px-2 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-sm md:text-base",
  {
    variants: {
      variant: {
        default: "py-4 px-2 hover:text-foreground dark:hover:text-foreground",
        card: "py-4 px-4 hover:text-foreground dark:hover:text-foreground",
        outline: "py-4 px-4 hover:text-foreground dark:hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, variant, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(accordionTriggerVariants({ variant, className }))}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden="true" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName =
  AccordionPrimitive.Trigger.displayName

const accordionContentVariants = cva(
  "overflow-hidden text-sm transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:collapse data-[state=open]:animate-in data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "px-2 pb-4 pt-0 text-muted-foreground",
        card: "px-4 pb-4 pt-0 text-muted-foreground",
        outline: "px-4 pb-4 pt-0 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ variant, className }))}
    {...props}
  />
))
AccordionContent.displayName =
  AccordionPrimitive.Content.displayName

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
}
