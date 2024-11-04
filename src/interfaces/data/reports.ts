export interface IExpenseReport {
  rawMaterial: number
  packaging: number
  otherMaterial: number
  expenses: [
    {
      _id: string
      category: {
        _id: string
        name: string
      }
      amount: number
      month: string
      year: number
    },
  ]
}

export interface ISellReport {
  total_sell_amount: number
}

export interface IStockReport {
  product: {
    _id: string
    name: string
  }
  variant: {
    _id: string
    name: string
  }
  type: string
  qty: number
  c2c: number
  count: number
}
