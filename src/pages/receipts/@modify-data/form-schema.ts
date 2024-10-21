import { z } from 'zod'

export const formSchema = z.object({
  buyer: z.string(),
  remarks: z.string(),
  amount: z.number(),
})
