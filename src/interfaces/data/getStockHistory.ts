export interface IStockHistory {
  status: "purchaseItem" | "stock" | "wastage" | "mixture_product"
  seller: string
  createdAt: string
  qty: number
}