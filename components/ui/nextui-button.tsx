import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "bordered" | "light" | "flat"
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "default"
  size?: "sm" | "md" | "lg"
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  children: React.ReactNode
}

export function Button({
  className,
  variant = "solid",
  color = "default",
  size = "md",
  startContent,
  endContent,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }

  const variantClasses = {
    solid: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      warning: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      default:
        "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
    },
    bordered: {
      primary: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:hover:bg-blue-950",
      secondary: "border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500 dark:hover:bg-gray-950",
      success: "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500 dark:hover:bg-green-950",
      warning:
        "border border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500 dark:hover:bg-yellow-950",
      danger: "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 dark:hover:bg-red-950",
      default:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    },
    light: {
      primary: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:hover:bg-blue-950",
      secondary: "text-gray-600 hover:bg-gray-50 focus:ring-gray-500 dark:hover:bg-gray-950",
      success: "text-green-600 hover:bg-green-50 focus:ring-green-500 dark:hover:bg-green-950",
      warning: "text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500 dark:hover:bg-yellow-950",
      danger: "text-red-600 hover:bg-red-50 focus:ring-red-500 dark:hover:bg-red-950",
      default: "text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800",
    },
    flat: {
      primary: "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500 dark:bg-blue-900 dark:text-blue-200",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-200",
      success:
        "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500 dark:bg-green-900 dark:text-green-200",
      warning:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500 dark:bg-yellow-900 dark:text-yellow-200",
      danger: "bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500 dark:bg-red-900 dark:text-red-200",
      default: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-200",
    },
  }

  return (
    <button className={cn(baseClasses, sizeClasses[size], variantClasses[variant][color], className)} {...props}>
      {startContent && <span className="mr-2">{startContent}</span>}
      {children}
      {endContent && <span className="ml-2">{endContent}</span>}
    </button>
  )
}
