"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-[var(--primary)] text-[#0A1A2E] hover:bg-[var(--primary-dim)] hover:text-white",
        secondary: "bg-[var(--surface-2)] dark:bg-[var(--surface-2)] text-[var(--text-1)] border border-[var(--border)] hover:bg-[var(--border)]",
        ghost: "bg-transparent text-[var(--text-2)] hover:bg-[var(--primary-muted)] hover:text-[var(--primary)]",
        danger: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary-muted)]",
      },
      size: {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";
