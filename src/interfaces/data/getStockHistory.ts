export interface IStockHistory {
  status: "purchaseItem" | "stock" | "wastage"
  seller: string
  createdAt: string
  qty: number
}