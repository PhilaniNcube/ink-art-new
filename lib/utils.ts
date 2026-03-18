import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Variant } from "@/utils/supabase/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
}


export function getAvailableVariants(variants: Variant[]): Variant[] {
  return variants.filter(
    (v) => v.is_available && v.is_enabled
  );
}
