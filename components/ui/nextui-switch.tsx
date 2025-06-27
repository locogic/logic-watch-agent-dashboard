"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  color?: "primary" | "secondary" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
}

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  color = "primary",
  size = "md",
  disabled = false,
  className,
}: SwitchProps) {
  const [isChecked, setIsChecked] = React.useState(defaultChecked)

  const currentChecked = checked !== undefined ? checked : isChecked

  const handleToggle = () => {
    if (disabled) return
    const newChecked = !currentChecked
    if (checked === undefined) {
      setIsChecked(newChecked)
    }
    onChange?.(newChecked)
  }

  const sizeClasses = {
    sm: "h-4 w-7",
    md: "h-6 w-11",
    lg: "h-8 w-14",
  }

  const thumbSizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  }

  const colorClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={currentChecked}
      onClick={handleToggle}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        sizeClasses[size],
        currentChecked ? colorClasses[color] : "bg-gray-200 dark:bg-gray-700",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block transform rounded-full bg-white transition-transform",
          thumbSizeClasses[size],
          currentChecked ? "translate-x-6" : "translate-x-1",
          size === "sm" && (currentChecked ? "translate-x-4" : "translate-x-0.5"),
          size === "lg" && (currentChecked ? "translate-x-7" : "translate-x-0.5"),
        )}
      />
    </button>
  )
}
