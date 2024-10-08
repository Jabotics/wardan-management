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

const GST_INPUT_PATTERN = /^[A-Z0-9]{15}$/;

export const GSTValidation = (value: string) => {
  if (!value) return 'GST Number is required';
  if (!GST_INPUT_PATTERN.test(value)) return 'GST Number must be 15 characters long and alphanumeric';
  return true;
};

export function transformString(input: string) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  return input
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
