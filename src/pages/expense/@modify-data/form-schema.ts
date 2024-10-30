import { z } from 'zod'

export const formSchema = z.object({
  category: z.string(),
  remarks: z.string(),
  month: z.string(),
  year: z.number(),
  amount: z.number()
})
