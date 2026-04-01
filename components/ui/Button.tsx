import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-syntax-blue/40 focus:ring-offset-2 cursor-pointer"

    const variants = {
      primary:
        "bg-syntax-blue text-white hover:bg-[#052885] shadow-md hover:shadow-lg active:scale-[0.98]",
      secondary:
        "bg-white text-syntax-blue border border-gray-200 hover:border-syntax-blue/30 hover:bg-syntax-blue/5 shadow-sm hover:shadow-md active:scale-[0.98]",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-3.5 text-sm sm:text-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
