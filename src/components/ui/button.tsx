import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Variantes de shadcn mapeadas a los botones de la marca (.btn* en brand.css): esquinas vivas, luxury black.
const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "btn--primary",
      accent: "btn--accent",
      outline: "btn--outline",
      ghost: "btn--ghost",
    },
    size: {
      default: "",
      lg: "btn--lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
