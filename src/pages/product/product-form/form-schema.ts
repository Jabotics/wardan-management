import { z } from 'zod'

export const formSchema = z.object({
  name: z.string(),
  type: z.string(),
  ingredients: z.object({
    _id: z.string(),
    name: z.string()
  }).array().optional(),
})