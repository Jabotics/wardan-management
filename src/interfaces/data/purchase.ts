export interface IPurchase {
  _id: string
  invoice_no: string
  seller: {
    _id: string
    name: string
    address: string
    gst_number: string
  }
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER'
  invoice_amount: number
  transportation_charge: number
  unloading_charge: number
  total_amount: number
  createdAt?: string
}

export interface IPurchaseItem {
  _id: string
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER'
  product?: {
    _id: string
    name: string
  }
  material?: {
    _id: string
    name: string
  }
  variant?: {
    _id: string
    name: string
  }
  qty: number
  unit: string
  amount: number
  price_per_kg: number
  count?: number
}
