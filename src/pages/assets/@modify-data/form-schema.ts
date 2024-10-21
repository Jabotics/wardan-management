import { z } from 'zod'

export const formSchema = z.object({
  item_name: z.string(),
  invoice_no: z.string(),
  amount: z.number(),
})
