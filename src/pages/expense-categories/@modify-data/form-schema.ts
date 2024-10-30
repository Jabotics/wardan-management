import { z } from 'zod'

export const formSchema = z.object({
  product: z.string(),
  variant: z.string(),
  qty: z.number(),
  unit: z.string(),
  mrp: z.number(),
  count: z.number(),
  c2c: z.number(),
})
