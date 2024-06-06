import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCustomParams(params: object) {
  const customParams = { ...params }
  Object.keys(customParams).forEach((key) => {
    if (
      customParams[key as keyof object] === null ||
      customParams[key as keyof object] === undefined ||
      customParams[key as keyof object] === '' ||
      customParams[key as keyof object] === '[]'
    ) {
      delete customParams[key as keyof object]
    }
  })
  return customParams
}
