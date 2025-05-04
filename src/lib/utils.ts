import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompaniesDisplay(companies: string[] = []) {
  const displayed = companies.slice(0, 2);
  const remainingCount = Math.max(companies.length - 2, 0);

  return {
    displayed,  
    remainingCount, 
  };
}

export function formatStationLabel(label: string): string {
  const match = label.match(/^(\d+)_([\s\S]+)$/);
  if (!match) return label;

  const numberPart = match[1];
  const namePart = match[2].replace(/_/g, " ");

  return `${numberPart} - ${namePart}`;
}
