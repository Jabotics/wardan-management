
interface Traders {
  _id: string
  name: string
  address: string
  gst_number: string
  phone: string
  is_active?: boolean
}

export interface ISeller extends Traders {
  payable_amount?: number
}

export interface IBuyer extends Traders {
  outstanding_amount?: number
}
