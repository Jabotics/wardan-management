export interface IProduct {
  _id?: string
  name: string
  is_active?: boolean
  type: 'WHOLE' | 'MIXTURE'
  ingredients?: {
    _id: string
    name: string
  }[]
}

export interface IVariant {
  _id: string
  name: string
  is_active?: boolean
}

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
