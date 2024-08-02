/* eslint-disable react/prop-types */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

/* 
 button {
  border - radius: 15px;
  border: 1px solid transparent;
  width: 190px;
  height: 50px;
  padding: 0.6em 1.2em;
  font - size: 1em;
  font - weight: 500;
  font - family: inherit;
  color: var(--clr - fondo);
  background - color: #c61064;
  cursor: pointer;
} */

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-lg font-medium",
  {
    variants: {
      variant: {
        default: "bg-pink-700 text-white ",
        primary: "bg-pink-700 text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl py-2 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
