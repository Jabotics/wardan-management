import { z } from 'zod'

export const addSellSchema = z.object({
  buyer: z.string(),
  total_qty: z.number(),
  total_amount: z.number(),
})

export const sellItemsSchema = z.object({
  sellItems: z.array(
    z.object({
      product: z.string(),
      variant: z.string(),
      qty: z.number(),
      amount: z.number(),
      c2c: z.number(),
    })
  ),
})
