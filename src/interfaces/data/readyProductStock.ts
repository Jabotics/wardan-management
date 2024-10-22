export interface IReadyProductStock {
  _id: string
  product: {
    _id: string
    name: string
  }
  variant: {
    _id: string
    name: string
  }
  qty: number
  unit: string
  mrp: number
  count: number
  c2c: number
  updatedAt: string
}
