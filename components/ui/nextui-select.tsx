"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  children: React.ReactNode
  defaultSelectedKeys?: string[]
  className?: string
  size?: "sm" | "md" | "lg"
  placeholder?: string
}

interface SelectItemProps {
  key: string
  value: string
  children: React.ReactNode
}

export function Select({ children, defaultSelectedKeys, className, size = "md", placeholder }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedKey, setSelectedKey] = React.useState(defaultSelectedKeys?.[0] || "")

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }

  const items = React.Children.toArray(children) as React.ReactElement<SelectItemProps>[]
  const selectedItem = items.find((item) => item.props.value === selectedKey)

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-gray-300 bg-white text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800",
          sizeClasses[size],
        )}
      >
        <span className={selectedItem ? "text-gray-900 dark:text-gray-100" : "text-gray-500"}>
          {selectedItem ? selectedItem.props.children : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.props.key}
                type="button"
                onClick={() => {
                  setSelectedKey(item.props.value)
                  setIsOpen(false)
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {item.props.children}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SelectItem({ children }: SelectItemProps) {
  return <>{children}</>
}
