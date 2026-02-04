import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper function to combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to Indonesian format
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return new Date(dateString).toLocaleDateString("id-ID", options)
}

