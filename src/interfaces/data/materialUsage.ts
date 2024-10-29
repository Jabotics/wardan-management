export interface IMaterialUsage {
  _id: string
  category: 'PACKAGING_PRODUCT' | 'OTHER'
  items: {
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
    _id: string
  }[]
  createdAt: string
}
