import type React from "react"
import { cn } from "@/lib/utils"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export function Divider({ className, orientation = "horizontal", ...props }: DividerProps) {
  return (
    <div
      className={cn(
        "border-gray-200 dark:border-gray-700",
        orientation === "horizontal" ? "border-t w-full" : "border-l h-full",
        className,
      )}
      {...props}
    />
  )
}
