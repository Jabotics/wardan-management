import { z } from 'zod'

export const purchaseSchema = z.object({
  category: z.string(),
  invoice_no: z.string(),
  seller: z.string(),
  invoice_amount: z.number(),
  transportation_charge: z.number(),
  unloading_charge: z.number(),
  total_amount: z.number(),
})

export const purchaseItemsSchemaforRawMaterial = z.object({
  purchaseItems: z.array(z.object({
    product: z.string(),
    unit: z.string(),
    qty: z.number(),
    amount: z.number(),
  })),
});

export const purchaseItemsSchemaforPackagingProduct = z.object({
  product: z.string(),
  variant: z.string(),
  unit: z.string(),
  qty: z.number(),
  amount: z.number()
}).array()

export const purchaseItemsSchemaforOther = z.object({
  material: z.string(),
  unit: z.string(),
  qty: z.number(),
  amount: z.number()
}).array()
