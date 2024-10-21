interface IPaymentBase {
  amount: number
  remarks: string
}

export interface IAddPayment extends IPaymentBase {
  seller: string
}

export interface IUpdatePayment extends IPaymentBase {
  _id: string
  seller: string
}

export interface IPayment extends IPaymentBase {
  _id: string
  seller: {
    _id: string
    name: string
  }
  createdAt: string
}
