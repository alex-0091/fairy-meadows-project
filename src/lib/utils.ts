import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(lac: number): string {
  if (lac >= 100) {
    return `PKR ${(lac / 100).toFixed(1)} Crore`;
  }
  return `PKR ${lac} Lac`;
}

export function formatRent(perNight: number): string {
  return `PKR ${perNight.toLocaleString()}/night`;
}

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/923005183007?text=${encoded}`;
}
