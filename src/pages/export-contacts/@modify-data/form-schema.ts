import { z } from 'zod'

export const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  gst_number: z.string(),
  phone: z.string(),
})
