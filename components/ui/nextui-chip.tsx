import type React from "react"
import { cn } from "@/lib/utils"

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "bordered" | "light" | "flat"
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "default"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function Chip({ className, variant = "solid", color = "default", size = "md", children, ...props }: ChipProps) {
  const baseClasses = "inline-flex items-center rounded-full font-medium"

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-base",
  }

  const variantClasses = {
    solid: {
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-600 text-white",
      success: "bg-green-600 text-white",
      warning: "bg-yellow-600 text-white",
      danger: "bg-red-600 text-white",
      default: "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
    },
    bordered: {
      primary: "border border-blue-600 text-blue-600 bg-transparent",
      secondary: "border border-gray-600 text-gray-600 bg-transparent",
      success: "border border-green-600 text-green-600 bg-transparent",
      warning: "border border-yellow-600 text-yellow-600 bg-transparent",
      danger: "border border-red-600 text-red-600 bg-transparent",
      default: "border border-gray-300 text-gray-700 bg-transparent dark:border-gray-600 dark:text-gray-300",
    },
    flat: {
      primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    },
    light: {
      primary: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
      secondary: "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400",
      success: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
      warning: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400",
      danger: "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
      default: "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400",
    },
  }

  return (
    <span className={cn(baseClasses, sizeClasses[size], variantClasses[variant][color], className)} {...props}>
      {children}
    </span>
  )
}
