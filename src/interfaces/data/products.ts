export interface IProduct {
  _id?: string
  name: string
  is_active?: boolean
  type: 'WHOLE' | 'MIXTURE'
  ingredients?: {
    product: {
      _id: string
      name: string
    }
    qty: number
  }[]
}
