
interface Traders {
  _id: string
  name: string
  address: string
  gst_number: string
  phone: string
  is_active?: boolean
}

export interface ISeller extends Traders {}

export interface IBuyer extends Traders {}
