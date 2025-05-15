import { clsx, type ClassValue } from "clsx"
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDataFormatada(data: string): string{
    return DateTime.fromISO(data).toFormat("dd/MM/yyyy");
}