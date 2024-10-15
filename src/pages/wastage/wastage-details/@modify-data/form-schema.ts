import { z } from 'zod'

export const formSchema = z.object({
  category: z.string(),
  items: z.object({
    product: z.string(),
    qty: z.number(),
    unit: z.string(),
  }).array()
})
