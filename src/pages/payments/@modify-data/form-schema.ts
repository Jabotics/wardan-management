import { z } from 'zod'

export const formSchema = z.object({
  seller: z.string(),
  remarks: z.string(),
  amount: z.number(),
})
