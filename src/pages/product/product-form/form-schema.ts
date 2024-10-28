import { z } from 'zod'

export const formSchema = z.object({
  name: z.string(),
  type: z.string(),
  ingredients: z
    .object({
      product: z.object({
        _id: z.string(),
        name: z.string(),
      }),
      qty: z.number(),
    })
    .array()
    .optional(),
})
