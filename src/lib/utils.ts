import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

const GST_INPUT_PATTERN = /^[A-Z0-9]{15}$/

export const GSTValidation = (value: string) => {
  if (!value) return 'GST Number is required'
  if (!GST_INPUT_PATTERN.test(value))
    return 'GST Number must be 15 characters long and alphanumeric'
  return true
}

export function transformString(input: string) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string')
  }

  return input
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function formatDateToIST(dateString: string): string {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    console.error(`Invalid date string: ${dateString}`)
    return 'Invalid date'
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata',
    timeZoneName: 'short',
  }

  return new Intl.DateTimeFormat('en-IN', options).format(date)
}

export function toFixedWithoutRounding(num: number) {
  const factor = Math.pow(10, 2)
  return (Math.floor(num * factor) / factor).toFixed(2)
}

export function indianStyleAmount(num: number): string {
  const numStr = num.toString();

  const [integerPart, decimalPart] = numStr.split('.');
  
  let result = '';
  const length = integerPart.length;

  if (length > 3) {
    result += integerPart.slice(length - 3);
    console.log(result)
    
    for (let i = length - 3; i > 0; i -= 2) {
      result = integerPart.slice(i - 2, i) + ',' + result;
    }
    
    if (length % 2 === 1) {
      result = integerPart[0] + ',' + result;
    }
  } else {
    result = integerPart;
  }

  return decimalPart ? `${result}.${decimalPart}` : result;
}

