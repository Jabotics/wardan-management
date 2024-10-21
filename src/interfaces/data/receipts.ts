interface IReceiptBase {
  amount: number
  remarks: string
}

export interface IAddReceipt extends IReceiptBase {
  buyer: string
}

export interface IUpdateReceipt extends IReceiptBase {
  _id: string
  buyer: string
}

export interface IReceipt extends IReceiptBase {
  _id: string
  buyer: {
    _id: string
    name: string
  }
  createdAt: string
}
