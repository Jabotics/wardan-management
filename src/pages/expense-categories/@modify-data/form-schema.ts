import { z } from 'zod'

export const formSchema = z.object({
  name: z.string(),
})
